import React from 'react';
import { Link, Box, Container } from '@mui/material';
import { TitleLabel } from '../atoms';
import { LogInForm, GoogleSignIn } from '../molecules';

export default function SignUpTemplate() {
  return (
    <>
      <TitleLabel title="Log in" variant="h4" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LogInForm />

          <Link href="/auth/forgotten-password" color="secondary" paddingY={1}>
            Forgot password?
          </Link>

          <Link href="/auth/sign-up" color="secondary">
            You do not have an account? Sign up
          </Link>

          <GoogleSignIn />
        </Box>
      </Container>
    </>
  );
}
