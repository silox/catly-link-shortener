import { Link } from '../types/models';
import supabase from '../utils/supabaseClient';

const baseLinkQuery = () => supabase.from('links').select('*');
const getLinkQuery = (linkId: string) => baseLinkQuery().eq('id', linkId).maybeSingle();
const getUserLinksQuery = (userId: string) => baseLinkQuery().eq('userid', userId);

const getLinkById = async (linkId: string): Promise<Link | null> => {
  const { data: link, error } = await getLinkQuery(linkId);
  return (!error && link) ? (link as Link) : null;
};

const getLinksByUserId = async (userId: string): Promise<Link[]> => {
  const { data: links, error } = await getUserLinksQuery(userId);
  return (!error && links) ? (links as Link[]) : [];
};

const getLinkCountByUserId = async (
  userId: string,
): Promise<number> => (await getLinksByUserId(userId)).length;

export {
  getLinkById,
  getLinksByUserId,
  getLinkCountByUserId,
};
