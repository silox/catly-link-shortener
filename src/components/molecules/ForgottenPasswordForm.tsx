import React, { useState, FormEvent } from 'react';
import {
  Box, Grid, TextField, FormHelperText,
} from '@mui/material';
import { SubmitButton } from '../atoms';
import supabase from '../../utils/supabaseClient';

type ForgottenPasswordFormProps = {
    setNotify: (notify: boolean) => void;
}

export default function ForgottenPasswordForm({ setNotify }: ForgottenPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const handlePasswordReset = async (event: FormEvent) => {
    event.preventDefault();

    if (!email) return;

    setLoading(true);

    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      setErrors(error.message);
    } else {
      setNotify(true);
      setErrors('');
    }

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={(event: FormEvent) => handlePasswordReset(event)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            onChange={(event) => { setEmail(event.target.value); }}
            label="Email"
            name="email"
            autoComplete="email"
          />
        </Grid>

        <Grid item xs={12}>
          {errors && <FormHelperText error>{errors}</FormHelperText>}
        </Grid>

        <Grid item xs={12}>
          <SubmitButton title="Send recovery email" loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
}
