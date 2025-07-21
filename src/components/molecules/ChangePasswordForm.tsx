import React, { useState } from 'react';
import {
  TextField, Grid, Box, FormHelperText,
} from '@mui/material';
import supabase from '../../utils/supabaseClient';
import { Notification, SubmitButton } from '../atoms';

export default function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setErrors('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.update({ password });

    if (error) {
      setErrors(error.message);
    } else {
      setErrors('');
      setNotify(true);
    }
    setLoading(false);
  };

  return (
    <Box component="form" noValidate onSubmit={handlePasswordChange}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New password"
            type="password"
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Repeat password"
            type="password"
            autoComplete="new-password"
            onChange={(event) => setRepeatPassword(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          {errors && <FormHelperText error>{errors}</FormHelperText>}
        </Grid>

        <Grid item xs={12}>
          <SubmitButton title="Save password" loading={loading} />
        </Grid>

        <Notification
          message="Password changed"
          open={notify}
          setOpen={setNotify}
        />
      </Grid>
    </Box>
  );
}
