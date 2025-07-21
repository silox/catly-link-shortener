import { Link, Box, Container } from '@mui/material';
import { TitleLabel } from '../atoms';
import { SignUpForm, GoogleSignIn } from '../molecules';

export default function SignUpTemplate() {
  return (
    <>
      <TitleLabel title="Sign up" variant="h4" />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SignUpForm />

          <Link href="/auth/log-in" color="secondary">
            Already have an account? Log in
          </Link>

          <GoogleSignIn />
        </Box>
      </Container>
    </>
  );
}
