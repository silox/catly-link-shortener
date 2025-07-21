import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '../../states/atoms';
import { getLinkCountByUserId } from '../../supawrap/links';
import { getClickCountByUserId, getTodayClickCountByUserId } from '../../supawrap/linkStats';

import { LoadingCircle, TitleLabel } from '../atoms';
import { StatBox } from '../molecules';
import GraphStatistics from './GraphStatistics';

export default function DashboardUser() {
  const session = useRecoilValue(sessionAtom);
  const [linkCount, setLinkCount] = useState<number | null>(null);
  const [totalClickCount, setTotalClickCount] = useState<number | null>(null);
  const [todayClicksCount, setTodayClicksCount] = useState<number | null>(null);

  const userId = session?.user?.id || '';

  useEffect(() => {
    const fetchData = async () => {
      setLinkCount(await getLinkCountByUserId(userId));
      setTotalClickCount(await getClickCountByUserId(userId));
      setTodayClicksCount(await getTodayClickCountByUserId(userId));
    };
    fetchData();
  }, [userId]);

  if (linkCount === null || totalClickCount === null || todayClicksCount === null) {
    return (
      <LoadingCircle />
    );
  }

  return (
    <>
      <TitleLabel title="Dashboard" variant="h5" />
      <Container component="main" maxWidth="sm" sx={{ marginTop: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            <StatBox
              title="Total Links"
              value={linkCount}
              icon="/svg/link.svg"
            />
          </Grid>
          <Grid item xs={6}>
            <StatBox
              title="Total clicks"
              value={totalClickCount}
              icon="/svg/arrow.svg"
            />
          </Grid>
          <Grid item xs={6}>
            <StatBox
              title="Clicks today"
              value={todayClicksCount}
              icon="/svg/calendar.svg"
            />
          </Grid>
          <Grid item xs={6}>
            <StatBox
              title="Time wasted"
              value={`${(totalClickCount || 0) * 5} seconds`}
              icon="/svg/clock.svg"
            />
          </Grid>
          <Grid item xs={12}>
            <GraphStatistics userId={userId} linkId={null} />
          </Grid>
        </Grid>

      </Container>

    </>
  );
}
