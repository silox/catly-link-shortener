import React, { useState } from 'react';
import {
  Box, Container,
} from '@mui/material';
import { Notification, TitleLabel } from '../atoms';
import ForgottenPasswordForm from '../molecules/ForgottenPasswordForm';

export default function ForgottenPasswordTemplate() {
  const [notify, setNotify] = useState(false);

  return (
    <>
      <TitleLabel title="Forgotten password" variant="h4" />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ForgottenPasswordForm setNotify={setNotify} />

        </Box>
      </Container>

      <Notification
        message="Recovery email sent"
        open={notify}
        setOpen={setNotify}
      />
    </>
  );
}
