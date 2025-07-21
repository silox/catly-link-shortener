import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box, Container, TextField, Button, Collapse, FormHelperText,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import copy from 'copy-to-clipboard';
import Router from 'next/router';
import { sessionAtom } from '../../states/atoms';
import { Notification } from '../atoms';
import { DashboardAnonymous, DashboardUser } from '../organisms';

export default function HomeTemplate() {
  const session = useRecoilValue(sessionAtom);

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errors, setErrors] = useState('');

  const handleShorten = async () => {
    setLoading(true);
    const response = await fetch('/api/short', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          destinationUrl: url,
          userid: session?.user?.id,
        },
      ),
    });

    const { data, error } = await response.json();
    setLoading(false);

    if (error) {
      setErrors('Unexpected error');
      setShortUrl('');
      return;
    }

    setErrors('');
    const { id, shortenedUrl } = data;
    // Redirect to edit link if user is logged in
    if (session?.user) {
      Router.push(`/app/links/${id}`);
    }

    setShortUrl(shortenedUrl);
  };

  const copyToClipboard = () => {
    copy(shortUrl);
    setIsCopied(true);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src="/svg/cat.svg" alt="Catly cat" width="100%" height="100%" />
          <TextField
            fullWidth
            size="small"
            name="link"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Paste your URL here"
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{ marginTop: 3 }}
          />

          <Collapse in={shortUrl !== ''}>
            <Button
              fullWidth
              onClick={copyToClipboard}
              variant="outlined"
              color="info"
              endIcon={<ContentCopyIcon />}
              sx={{
                textTransform: 'none',
                marginTop: 2,
                textAlign: 'center',
              }}
            >
              {shortUrl}
            </Button>
          </Collapse>

          {errors && <FormHelperText error>{errors}</FormHelperText>}

          <Button
            color="secondary"
            size="large"
            variant="contained"
            disabled={loading}
            onClick={handleShorten}
            endIcon={<AutoFixHighIcon />}
            sx={{ marginY: 3, fontWeight: 'bold' }}
          >
            Shorten
          </Button>

          <Notification
            message="Copied to clickboard"
            open={isCopied}
            setOpen={setIsCopied}
          />

        </Box>
      </Container>
      {!session || !session.user ? (
        <DashboardAnonymous />
      ) : (
        <DashboardUser />
      )}
    </>

  );
}
