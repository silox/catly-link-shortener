import React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { ChangePasswordForm } from '../molecules';
import { SignOutButton, TitleLabel } from '../atoms';

export default function ChangePasswordTemplate() {
  return (
    <>
      <TitleLabel title="Profile" variant="h4" />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" paddingBottom={5}>Change password</Typography>
        <ChangePasswordForm />
        <SignOutButton />

      </Container>
    </>
  );
}
