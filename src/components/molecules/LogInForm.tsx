import * as Yup from 'yup';
import React, { FormEvent, useState } from 'react';
import {
  Box, Grid, TextField, FormHelperText,
} from '@mui/material';
import Router from 'next/router';
import { SubmitButton } from '../atoms';
import supabase from '../../utils/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await validationSchema.validate({ email, password });
    } catch (error) {
      setErrors(error instanceof Yup.ValidationError ? error.message : 'Unknown error');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setErrors(error.message);
    } else {
      Router.push('/');
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleLogIn}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
      {errors && <FormHelperText error>{errors}</FormHelperText>}
      <SubmitButton title="Log in" loading={loading} />
    </Box>
  );
}
