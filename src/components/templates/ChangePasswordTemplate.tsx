import React from 'react';
import Container from '@mui/material/Container';
import { ChangePasswordForm } from '../molecules';
import { TitleLabel, SignOutButton } from '../atoms';

export default function ChangePasswordTemplate() {
  return (
    <>
      <TitleLabel title="Change lost password" variant="h4" />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ChangePasswordForm />
        <SignOutButton />
      </Container>
    </>
  );
}
