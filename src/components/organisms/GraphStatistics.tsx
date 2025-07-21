import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';
import { ComponentType, useEffect, useState } from 'react';
import { ItemBox } from '../atoms';
import {
  getClickCountHistoryByUserId,
  getClickCountHistoryByLinkId,
} from '../../supawrap/linkStatsHistory';
import { LinkHistory } from '../../types/models';

type ChartProps = {
  data: { key: string, data: number }[],
  height: number | string,
  width: number | string,
}

// Workaround because reaviz & d3 do not go well with SSR and nextjs:
// https://github.com/reaviz/reaviz/issues/48
const HistogramBarChart: ComponentType<ChartProps> = dynamic(() => import('reaviz' as any).then((mod) => mod.HistogramBarChart), { ssr: false });

type GraphStatisticsProps = {
  userId: string | null,
  linkId: string | null,
}
export default function GraphStatistics({ userId, linkId }: GraphStatisticsProps) {
  const [clickCountHistory, setClickCountHistory] = useState<LinkHistory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setClickCountHistory(await getClickCountHistoryByUserId(userId));
      } else if (linkId) {
        setClickCountHistory(await getClickCountHistoryByLinkId(linkId));
      }
    };
    fetchData();
  }, [linkId, userId]);

  const parseData = (data: LinkHistory) => Object.entries(data).map(([date, value]) => ({
    key: date,
    data: value,
  }));

  return (
    <ItemBox>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Total clicks - last 30 days
      </Typography>
      {clickCountHistory && (
      <HistogramBarChart
        data={parseData(clickCountHistory)}
        height={300}
        width="auto"
      />
      )}
    </ItemBox>
  );
}
