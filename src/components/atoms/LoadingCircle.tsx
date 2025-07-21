import { CircularProgress } from '@mui/material';

export default function LoadingCircle() {
  return (
    <div className="fixed top-2/4 left-2/4 right-2/4 -m-11">
      <CircularProgress size={100} color="secondary" />
    </div>
  );
}
