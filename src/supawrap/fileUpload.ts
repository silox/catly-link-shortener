import supabase from '../utils/supabaseClient';

const removePreviousFile = async (linkId: string) => {
  const { error, data } = await supabase.from('links').select('fileId').match({ id: linkId }).single();
  if (error || !data) {
    return;
  }
  const { fileId: oldFileId } = data;
  if (oldFileId) {
    await supabase.storage.from('contents').remove([`public/${oldFileId}`]);
  }
};

const updateFile = async (fileId: string, file: File | null, linkId: string): Promise<boolean> => {
  // Remove previously linked file
  await removePreviousFile(linkId);

  if (file) {
    // Upload new file to storage
    const fileBody = await file.arrayBuffer();
    const { error, data } = await supabase.storage.from('contents').upload(`public/${fileId}`, fileBody, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

    if (error || !data) {
      return false;
    }
  }

  // Upadate linked file in the links table
  await supabase.from('links')
    .update({ fileId })
    .match({ id: linkId });

  return true;
};

export default updateFile;
