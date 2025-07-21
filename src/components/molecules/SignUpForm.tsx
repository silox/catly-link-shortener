import React, { FormEvent, useState } from 'react';
import {
  Box, Grid, TextField, FormHelperText,
} from '@mui/material';
import Router from 'next/router';
import * as Yup from 'yup';
import { SubmitButton } from '../atoms';
import supabase from '../../utils/supabaseClient';

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),
  });

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await validationSchema.validate({ email, password, passwordConfirm });
    } catch (error) {
      setErrors(error instanceof Yup.ValidationError ? error.message : 'Unknown error');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrors(error.message);
    } else {
      Router.push('/');
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSignUp}>
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
            label="Choose password"
            type="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={(event) => setPasswordConfirm(event.target.value)}
            name="password_confirm"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
      {errors && <FormHelperText error>{errors}</FormHelperText>}
      <SubmitButton title="Sign Up" loading={loading} />
    </Box>
  );
}
