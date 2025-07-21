import { Button } from '@mui/material';
import React from 'react';

type FileUploadButtonProps = {
    loading: boolean;
    onDelete: () => void;
}

export default function FileUploadButton({ loading, onDelete }: FileUploadButtonProps) {
  return (
    <Button
      type="submit"
      color="error"
      size="small"
      variant="outlined"
      disabled={loading}
      onClick={() => onDelete()}
      sx={{ marginTop: 1 }}
    >
      Remove file
    </Button>
  );
}
