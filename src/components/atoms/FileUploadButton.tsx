import { Button, CircularProgress } from '@mui/material';
import React, { ChangeEvent } from 'react';

type FileUploadButtonProps = {
    loading: boolean;
    onUpload: (event: ChangeEvent) => void;
}

export default function FileUploadButton({ loading, onUpload }: FileUploadButtonProps) {
  return (
    <Button
      variant="outlined"
      color="info"
      size="small"
      component="label"
      disabled={loading}
      sx={{ marginY: 1 }}
    >
      {loading ? <CircularProgress size={25} /> : 'Upload file'}
      <input
        type="file"
        onChange={(event) => onUpload(event)}
        hidden
      />
    </Button>
  );
}
