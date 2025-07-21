import React from 'react';
import { Button } from '@mui/material';
import Router from 'next/router';

export default function SignOutButton() {
  return (
    <Button
      fullWidth
      onClick={() => Router.push('/auth/log-out')}
      size="large"
      variant="outlined"
      color="error"
      sx={{ marginY: 4 }}
    >
      Log Out
    </Button>
  );
}
