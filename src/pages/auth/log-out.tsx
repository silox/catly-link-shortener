import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PageTitle } from '../../components/utils';
import { sessionAtom } from '../../states/atoms';
import supabase from '../../utils/supabaseClient';

export default function LogOut() {
  const router = useRouter();
  const session = useRecoilValue(sessionAtom);

  useEffect(() => {
    if (session?.user) {
      supabase.auth.signOut();
    }
    router.push('/auth/log-in');
  });

  return (
    <PageTitle title="Log out" />
  );
}
