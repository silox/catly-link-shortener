import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type SubmitButtonProps = {
    title: string;
    loading: boolean;
}

export default function SubmitButton({ title, loading, ...props }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      color="secondary"
      fullWidth
      size="large"
      variant="contained"
      sx={{ marginTop: 3, marginBottom: 2 }}
      disabled={loading}
      {...props}
    >
      {loading ? <CircularProgress size={25} /> : title}
    </Button>
  );
}
