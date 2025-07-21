import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { useRecoilValue } from 'recoil';
import {
  DeleteButton, ItemBox, LoadingCircle, TitleLabel,
} from '../atoms';
import { BoxElement, StatBox } from '../molecules';
import { GraphStatistics, FileUpload } from '../organisms';
import { Link } from '../../types/models';
import supabase from '../../utils/supabaseClient';
import NotFoundTemplate from './NotFoundTemplate';
import { getClickCountByLinkId, getTodayClickCountByLinkId } from '../../supawrap/linkStats';
import { PageTitle } from '../utils';
import { sessionAtom } from '../../states/atoms';

export interface LinkDetailTemplateProps {
  linkId: string;
}

export default function LinkDetailTemplate({
  linkId,
}: LinkDetailTemplateProps) {
  const router = useRouter();
  const session = useRecoilValue(sessionAtom);
  const [link, setLink] = useState<Link | null>(null);
  const [totalClickCount, setTotalClickCount] = useState<number | null>(null);
  const [todayClickCount, setTodayClickCount] = useState<number | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchLinkData = async () => {
      const linkData = await supabase.from('links').select('*').eq('id', linkId).single();
      setLink(linkData.data);
      setStatus(linkData.status);
    };

    const fetchLinkStatData = async () => {
      if (linkId) {
        setTotalClickCount(await getClickCountByLinkId(linkId));
        setTodayClickCount(await getTodayClickCountByLinkId(linkId));
      }
    };

    if (linkId) {
      fetchLinkData();
      fetchLinkStatData();
    }
  }, [linkId]);

  const deleteLinkData = async (event: InputEvent) => {
    event.preventDefault();

    await supabase
      .from('linkStats')
      .delete()
      .match({ link: linkId });

    await supabase
      .from('links')
      .delete()
      .match({ id: linkId });

    router.push('/app/links');
  };

  if (!status) {
    return (
      <>
        <PageTitle title="Loading..." />
        <LoadingCircle />
        ;
      </>
    );
  }

  if (status !== 200 || link?.userid !== session?.user?.id) {
    return <NotFoundTemplate title="Link not found" />;
  }

  return (
    <>
      <TitleLabel title={link?.title || 'Your link'} variant="h4" />
      <div className="md:flex md:justify-center md:items-center my-6">
        <div className="md:mb-0">
          <ItemBox className="md:min-w-[39rem] md:max-w-[30rem] mx-5">
            <BoxElement title="Original URL">
              <p className="text-md md:text-md overflow-clip">{link?.destinationUrl}</p>
            </BoxElement>
            <BoxElement title="Short URL">
              <a className="text-blue-500 text-md md:text-md overflow-clip" href={link?.shortenedUrl} target="_blank" rel="noreferrer">{link?.shortenedUrl}</a>
            </BoxElement>
            <BoxElement title="Ad">
              <FileUpload linkId={linkId} currentFileId={link ? link.fileId : null} />
            </BoxElement>
          </ItemBox>
        </div>

        <div className="flex justify-between md:flex-col mx-5">
          <StatBox
            title="Total Clicks"
            value={totalClickCount}
            icon="/svg/arrow.svg"
            className="w-[49%] mx-0 md:w-full md:py-4 md:px-8"
          />
          <StatBox
            title="Clicks Today"
            value={todayClickCount}
            icon="/svg/calendar.svg"
            className="w-[49%] mx-0 md:w-full md:py-4 md:px-8"
          />
        </div>
      </div>

      <div className="md:flex md:justify-center md:items-center ">
        {/* <GraphStatistics /> */}
      </div>

      <Container maxWidth="md">
        <GraphStatistics linkId={linkId} userId={null} />
      </Container>

      <div className="md:flex md:justify-center mx-5">
        <DeleteButton title="Delete link" className="md:basis-52 my-6" onSubmit={deleteLinkData} />
      </div>
    </>
  );
}
