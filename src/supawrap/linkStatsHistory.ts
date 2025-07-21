import { PostgrestFilterBuilder } from '@supabase/supabase-js/node_modules/@supabase/postgrest-js';
import { LinkStat, LinkHistory } from '../types/models';
import { linkStatsByLinkIdQuery, linkStatsByUserIdQuery } from './linkStats';

const HISTORY_DAYS_RANGE = 30;

const getLinkHistoryStatQuery = (baseQuery: PostgrestFilterBuilder<any>) => baseQuery
  .gt('date', new Date(new Date()
    .setDate(new Date().getDate() - HISTORY_DAYS_RANGE)).toISOString())
  .order('date', { ascending: true });

const buildHistory = (linkStats: LinkStat[]): LinkHistory => {
  const history: LinkHistory = {};
  linkStats.forEach(({ date, clickCount }) => {
    history[date] = (history[date] || 0) + clickCount;
  });
  return history;
};

const getClickCountHistoryByLinkId = async (linkId: string): Promise<LinkHistory> => {
  const { data: linkStats, error } = await getLinkHistoryStatQuery(linkStatsByLinkIdQuery(linkId));
  return error ? {} : buildHistory(linkStats);
};

const getClickCountHistoryByUserId = async (userId: string): Promise<LinkHistory> => {
  const { data: linkStats, error } = await getLinkHistoryStatQuery(linkStatsByUserIdQuery(userId));
  return error ? {} : buildHistory(linkStats);
};

export {
  getClickCountHistoryByLinkId,
  getClickCountHistoryByUserId,
};
