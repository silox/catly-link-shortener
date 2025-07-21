import { Box, Button } from '@mui/material';

export interface DeleteButtonProps {
  title: string;
  onSubmit: any;
  className?: string;
}

export default function DeleteButton({
  title,
  onSubmit,
  className = '',
}: DeleteButtonProps) {
  return (
    <Box className={className} component="form" onSubmit={onSubmit}>
      <Button
        type="submit"
        color="error"
        size="large"
        variant="contained"
        fullWidth
      >
        {title}
      </Button>
    </Box>
  );
}
