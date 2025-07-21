import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '../../states/atoms';
import { PageLink } from '../atoms';

export interface NavigationMenuProps {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export default function NavigationMenu({
  setIsOpened,
}: NavigationMenuProps) {
  const session = useRecoilValue(sessionAtom);

  if (session?.user) {
    return (
      <div className="hidden sm:flex items-center">
        <PageLink href="/" setIsOpened={setIsOpened}>Home</PageLink>
        <PageLink href="/app/about" setIsOpened={setIsOpened}>About</PageLink>
        <PageLink href="/app/links" setIsOpened={setIsOpened}>My Links</PageLink>
        <PageLink href="/app/profile" setIsOpened={setIsOpened}>Profile</PageLink>
        <PageLink href="/auth/log-out" setIsOpened={setIsOpened}>Log Out</PageLink>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center">
      <PageLink href="/" setIsOpened={setIsOpened}>Home</PageLink>
      <PageLink href="/app/about" setIsOpened={setIsOpened}>About</PageLink>
      <PageLink href="/auth/sign-up" setIsOpened={setIsOpened}>Sign up</PageLink>
      <PageLink href="/auth/log-in" setIsOpened={setIsOpened}>Log in</PageLink>
    </div>
  );
}
