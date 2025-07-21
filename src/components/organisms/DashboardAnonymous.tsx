import {
  Container, Typography, Button, Box, List, ListItem,
} from '@mui/material';
import Router from 'next/router';
import { TitleLabel } from '../atoms';

export default function DashboardAnonymous() {
  return (
    <>
      <TitleLabel title="Want Something Extra?" variant="h5" />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginY: 4,
          }}
        >

          <Typography variant="h5" fontWeight="bold" paddingBottom={3}>
            As a registered user you may:
          </Typography>

          <List sx={{ listStyleType: 'disc', paddingLeft: 2, paddingBottom: 5 }}>
            <ListItem sx={{ display: 'list-item' }}>Display a custom advertisement to viewers who clicks on your links</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Manage your links and ads</ListItem>
            <ListItem sx={{ display: 'list-item' }}>See detailed statistics about click performance of your links</ListItem>
          </List>

          <Box sx={{ width: 1 / 2 }}>
            <Button
              fullWidth
              size="large"
              color="secondary"
              variant="contained"
              sx={{ fontWeight: 'bold' }}
              onClick={() => { Router.push('/auth/sign-up'); }}
            >
              Sign up
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ paddingY: 2 }}>
              Already have an account?
            </Typography>

            <Button
              fullWidth
              size="large"
              color="secondary"
              variant="contained"
              sx={{ fontWeight: 'bold' }}
              onClick={() => { Router.push('/auth/log-in'); }}
            >
              Log In
            </Button>
          </Box>

        </Box>
      </Container>
    </>
  );
}
