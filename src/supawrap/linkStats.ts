import supabase from '../utils/supabaseClient';

const linkStatsByLinkIdQuery = (linkId: string) => supabase
  .from('linkStats')
  .select('*')
  .eq('link', linkId);

const linkStatsByLinkIdsQuery = (linkIds: string[]) => supabase
  .from('linkStats')
  .select('*')
  .in('link', linkIds);

const linkStatsByUserIdQuery = (userId: string) => supabase
  .from('linkStats')
  .select('*, links!inner(*)')
  .eq('links.userid', userId);

const getClickCountByLinkId = async (linkId: string): Promise<number> => {
  const { data: linkStats, error } = await linkStatsByLinkIdQuery(linkId);
  if (error || !linkStats.length) {
    return 0;
  }
  return linkStats.reduce((acc, { clickCount }) => acc + clickCount, 0);
};

const getClickCountByLinkIds = async (linkIds: string[]): Promise<{ [key: string]: number}> => {
  const { data: linkStats, error } = await linkStatsByLinkIdsQuery(linkIds);
  if (error || !linkStats.length) {
    return {};
  }
  const clickCountByLinkId: {[key: string]: number} = {};

  // This can be probably written in a more elegant way using map
  linkStats.forEach(({ link, clickCount }) => {
    clickCountByLinkId[link] = (clickCountByLinkId[link] || 0) + clickCount;
  });

  return clickCountByLinkId;
};

const getClickCountByUserId = async (userId: string): Promise<number> => {
  const { data: linkStats, error } = await linkStatsByUserIdQuery(userId);
  if (error || !linkStats.length) {
    return 0;
  }
  return linkStats.reduce((acc, { clickCount }) => acc + clickCount, 0);
};

const getTodayClickCountByLinkId = async (linkId: string): Promise<number> => {
  const { data: linkStats, error } = await linkStatsByLinkIdQuery(linkId)
    .eq('date', new Date().toISOString());
  return (!error && linkStats.length) ? linkStats[0].clickCount : 0;
};

const getTodayClickCountByUserId = async (userId: string): Promise<number> => {
  const { data: linkStats, error } = await linkStatsByUserIdQuery(userId)
    .eq('date', new Date().toISOString());

  if (error || !linkStats.length) {
    return 0;
  }
  return linkStats.reduce((acc, { clickCount }) => acc + clickCount, 0);
};

const increaseLinkClickCount = async (linkId: string): Promise<void> => {
  const { data: linkStat, error } = await linkStatsByLinkIdQuery(linkId)
    .eq('date', new Date().toISOString())
    .single();

  if (error) {
    await supabase.from('linkStats').insert([
      {
        link: linkId,
        date: new Date().toISOString(),
        clickCount: 1,
      },
    ]);
  } else {
    await supabase.from('linkStats').update({
      clickCount: (linkStat?.clickCount || 0) + 1,
    }).match({ id: linkStat?.id });
  }
};

export {
  linkStatsByLinkIdQuery,
  linkStatsByUserIdQuery,
  getClickCountByLinkId,
  getClickCountByLinkIds,
  getClickCountByUserId,
  getTodayClickCountByLinkId,
  getTodayClickCountByUserId,
  increaseLinkClickCount,
};
