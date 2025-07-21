import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Quicksand', sans-serif",
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#F8F272',
    },
    secondary: {
      main: '#242325',
      light: '#E2DEFF',
    },
    background: {
      default: '#f7f5fb',
    },
  },
  shape: {
    borderRadius: 20,
  },
});

export default theme;
