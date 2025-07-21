import React from 'react';
import { Box, Typography } from '@mui/material';

type TitleLabelProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    title: string;
}

export default function TitleLabel({ title, variant }: TitleLabelProps) {
  return (
    <Box bgcolor="primary.main" color="secondary.main" paddingY={2}>
      <Typography component="h1" variant={variant} textAlign="center" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
}
