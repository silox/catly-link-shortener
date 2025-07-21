import {
  Box, Container, Typography,
} from '@mui/material';
import Image from 'next/image';
import { TitleLabel } from '../atoms';

export default function AboutTemplate() {
  return (
    <>
      <TitleLabel title="About" variant="h4" />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginY: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src="/svg/cat.svg" alt="Catly cat" width="100%" height="100%" />

          <Typography paddingBottom={3} paddingTop={5}>
            Catly is a simple URL shortener that, in addition to a URL shortening
            service, provides a service to add a custom advertisement in the format
            of an image or a video displayed to viewers who click on your link.
          </Typography>

          <Typography paddingBottom={3}>
            In addition, it provides detailed link analytics about your links&apos;
            performance, such as the number of clicks on a particular day or time scale.
          </Typography>

          <Typography>
            Additional features (advertisement and link analytics) require users to
            sign in by creating an account using email and password or via their Google
            account.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
