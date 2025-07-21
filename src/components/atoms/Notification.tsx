import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type NotificationProps = {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Notification({ message, open, setOpen }: NotificationProps) {
  const action = (
    <IconButton
      size="small"
      color="inherit"
      onClick={() => setOpen(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      message={message}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
}
