import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '../../states/atoms';

export interface AuthenticationRequiredProps {
  children: React.ReactElement;
}

export default function AuthenticationRequired({
  children,
}: AuthenticationRequiredProps) {
  const session = useRecoilValue(sessionAtom);
  const router = useRouter();

  if (!session?.user) {
    router.push('/auth/log-in');
    return (
      <div>Authentication required</div>
    );
  }

  return children;
}
