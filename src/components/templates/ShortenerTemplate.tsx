import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { FilePreview, LoadingCircle, TitleLabel } from '../atoms';
import supabase from '../../utils/supabaseClient';
import NotFoundTemplate from './NotFoundTemplate';
import { PageTitle } from '../utils';
import { increaseLinkClickCount } from '../../supawrap/linkStats';

export interface ShortenerTemplateProps {
  slug: string;
}

export default function ShortenerTemplate({
  slug,
}: ShortenerTemplateProps) {
  const [advertUrl, setAdvertUrl] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      const linkData = await supabase
        .from('links')
        .select('*')
        .eq('shortenedUrl', `http://catly.zgabur.sk/${slug}`)
        .single();
      setLink(linkData?.data?.destinationUrl);
      increaseLinkClickCount(linkData?.data?.id);
      setStatus(linkData?.status);

      if (linkData?.data?.fileId) {
        const { publicURL } = await supabase.storage
          .from('contents/public')
          .getPublicUrl(linkData.data.fileId);
        setAdvertUrl(publicURL);
      }
    };

    if (slug) {
      fetchLink();
    }
  }, [slug]);

  if (!status) {
    return (
      <>
        <PageTitle title="Loading..." />
        <LoadingCircle />
        ;
      </>
    );
  }

  if (status !== 200) {
    return <NotFoundTemplate title="Link not found" />;
  }

  return (
    <>
      <PageTitle title="You will be redirected shortly..." />
      <TitleLabel title="You will be redirected in" variant="h4" />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h2" sx={{ paddingBottom: 3 }}>
          {advertUrl ? (
            <Countdown date={Date.now() + 5000}>
              <>
                <meta httpEquiv="refresh" content={`0; URL=${link}`} />
                <p className="text-lg">
                  If nothing happens
                  <a href={`${link}`} className="text-blue-500"> click here</a>
                </p>
              </>
            </Countdown>
          )
            : <meta httpEquiv="refresh" content={`0; URL=${link}`} />}
        </Typography>
        { advertUrl && <div className="mt-20 max-w-1/2 md:min-w-[40rem]"><FilePreview fileUrl={advertUrl} editPreview={false} /></div>}

      </Container>
    </>
  );
}
