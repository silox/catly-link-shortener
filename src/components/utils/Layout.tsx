import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Router from 'next/router';
import supabase from '../../utils/supabaseClient';
import { NavigationBar } from '../organisms';
import { sessionAtom } from '../../states/atoms';
import theme from '../../styles/theme';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  const setSession = useSetRecoilState(sessionAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();

    setSession(session);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, sessionArg) => {
        setSession(sessionArg);
        setLoading(false);
        if (event === 'PASSWORD_RECOVERY') {
          Router.push('/auth/change-password');
        }
      },
    );

    return () => {
      listener?.unsubscribe();
    };
  }, [setSession]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!loading && (
        <>
          <NavigationBar />
          {children}
        </>
      )}
    </ThemeProvider>
  );
}
