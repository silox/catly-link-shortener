import * as Yup from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Link } from '../../types/models';
import supabase from '../../utils/supabaseClient';

interface ShortRequest extends NextApiRequest {
  body: { destinationUrl: string; userid: string };
}

interface ShortResponse extends NextApiResponse {
  body: Link;
}

const validationSchema = Yup.object(
  {
    destinationUrl: Yup.string().required(),
    userid: Yup.string().uuid(),
  },
).noUnknown().strict();

// TODO: come up with more reasonable algorithm that prevents collisions
// also make the URL prefix not hardcoded but configurable via env var
const generateShortUrl = (): string => `http://catly.zgabur.sk/${Math.random().toString(36).slice(2, 8)}`;

const fetchUrlTitle = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const title = text.match(/<title>(.*?)<\/title>/i);
    return title ? title[1] : url;
  } catch (error) {
    return url;
  }
};

export default async function handler(
  request: ShortRequest,
  response: ShortResponse,
) {
  const linkData = request.body;
  try {
    await validationSchema.validate(linkData);
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      response.status(400).json({ error: error.message });
      return;
    }
    throw error;
  }

  const { destinationUrl } = linkData;
  const title = await fetchUrlTitle(destinationUrl);
  const shortenedUrl = await generateShortUrl();
  const monthAhead = new Date();
  monthAhead.setDate(monthAhead.getDate() + 30);

  const link = {
    title,
    shortenedUrl,
    ...{ expirationDate: monthAhead },
    ...linkData,
  };

  const { data, error } = await supabase.from('links').insert(link).single();

  if (error || !data) {
    response.status(500).json({ error: 'Something went wrong' });
  } else {
    response.status(200).json({ data });
  }
}
