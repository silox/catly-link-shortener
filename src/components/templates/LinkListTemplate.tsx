import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '../../states/atoms';
import { Link } from '../../types/models';
import supabase from '../../utils/supabaseClient';
import { ItemBox, LoadingCircle, TitleLabel } from '../atoms';
import { BoxElement } from '../molecules';
import { PageTitle } from '../utils';
import { getClickCountByLinkIds } from '../../supawrap/linkStats';

export default function LinkListTemplate() {
  const [links, setLinks] = useState<Link[]>([]);
  const [clickData, setClickData] = useState<{ [key: string]: number }>({});
  const [status, setStatus] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const session = useRecoilValue(sessionAtom);
  const pageLength = 10;

  useEffect(() => {
    const fetchLinkData = async () => {
      const queryBase = supabase.from('links').select('*').eq('userid', session?.user?.id);
      const linkCount = await queryBase;
      const { data: linkData, status: statusResponse } = await queryBase
        .order('modifiedAt', { ascending: false })
        .range((page - 1) * pageLength, page * pageLength - 1);

      setTotalPages(Math.ceil((linkCount.data?.length || 0) / pageLength));
      setStatus(statusResponse);

      if (linkData) {
        setLinks(linkData);
        setClickData(await getClickCountByLinkIds(linkData.map((link) => link.id)));
      }
    };
    fetchLinkData();
  }, [page, session?.user?.id]);

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!status) {
    return (
      <>
        <PageTitle title="Loading..." />
        <TitleLabel title="Links" variant="h4" />
        <LoadingCircle />
      </>
    );
  }

  return (
    <>
      <TitleLabel title="Links" variant="h4" />
      <div className="md:flex md:justify-center">
        <div className="flex md:w-1/2 flex-col my-6">
          {links.length === 0 ? (
            <ItemBox>
              <BoxElement title="You have no links">
                <div />
              </BoxElement>
            </ItemBox>
          ) : (
            <>
              <Pagination count={totalPages} page={page} onChange={pageChange} />

              {links.map((link) => (
                <a href={`/app/links/${link.id}`} key={link.id}>
                  <ItemBox>
                    <BoxElement textColor="text-secondary" className="text-xl md:text-xl overflow-clip" title={link.title || 'Link'}>
                      <p className="text-sm overflow-clip">{link.destinationUrl}</p>
                      <div className="flex justify-between">
                        <p className="text-blue-500 text-lg">{link.shortenedUrl}</p>
                        <p>{`${clickData[link.id] || 0} clicks`}</p>
                      </div>
                    </BoxElement>
                  </ItemBox>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
