import { FormHelperText } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../utils/supabaseClient';
import { FilePreview, FileUploadButton, RemoveFileButton } from '../atoms';
import updateFile from '../../supawrap/fileUpload';

type FileUploadProps = {
  linkId: string;
  currentFileId: string | null;
}

export default function FileUpload({ linkId, currentFileId }: FileUploadProps) {
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState(currentFileId);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (fileId) {
      const fetchFileUrl = async () => {
        const { data, error } = supabase.storage.from('contents/public').getPublicUrl(fileId);
        if (error || !data) {
          setErrors('Unable to load file');
        } else {
          setFileUrl(data.publicURL);
        }
      };
      fetchFileUrl();
    }
  }, [fileId, linkId]);

  const handleUploadFile = async (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files?.item(0);
    const newFileId = (`${uuidv4()}-${file?.name}`);
    setLoading(true);
    if (file && await updateFile(newFileId, file, linkId)) {
      setFileId(newFileId);
      setErrors('');
    } else {
      setErrors('Unable to upload file');
    }

    setLoading(false);
  };

  const handleDeleteFile = async () => {
    setLoading(true);
    if (await updateFile('', null, linkId)) {
      setErrors('');
      setFileId('');
      setFileUrl('');
    } else {
      setErrors('Unable to remove file');
    }
    setLoading(false);
  };

  return (
    <>
      <FileUploadButton loading={loading} onUpload={handleUploadFile} />
      {errors && <FormHelperText error>{errors}</FormHelperText>}

      {fileUrl
      && (
        <>
          <div className="overflow-scroll sm:overflow-auto">
            <FilePreview fileUrl={fileUrl} editPreview />
          </div>
          <RemoveFileButton loading={loading} onDelete={handleDeleteFile} />
        </>
      )}
    </>
  );
}
