import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import { FormHelperText } from '@mui/material';
import supabase from '../../utils/supabaseClient';

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = React.useState('');

  const handleGoogleLogIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) setErrors(error.message);
    setLoading(false);
  };

  return (
    <>
      <Button
        color="info"
        fullWidth
        size="large"
        variant="outlined"
        sx={{ marginTop: 3, marginBottom: 2 }}
        disabled={loading}
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogIn}
      >
        Google Sign in
      </Button>
      {errors && <FormHelperText error>{errors}</FormHelperText>}
    </>
  );
}
