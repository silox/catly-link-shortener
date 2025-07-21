import { useRecoilValue } from 'recoil';
import React, { Dispatch, SetStateAction } from 'react';
import { sessionAtom } from '../../states/atoms';
import { PageLink } from '../atoms';

export interface NavigationMenuProps {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export default function NavigationMenuMobile({
  setIsOpened,
}: NavigationMenuProps) {
  const session = useRecoilValue(sessionAtom);

  if (session?.user) {
    return (
      <div className="w-1/3 sm:hidden">
        <PageLink href="/" setIsOpened={setIsOpened}>Home</PageLink>
        <hr />
        <PageLink href="/app/about" setIsOpened={setIsOpened}>About</PageLink>
        <hr />
        <PageLink href="/app/links" setIsOpened={setIsOpened}>My Links</PageLink>
        <hr />
        <PageLink href="/app/profile" setIsOpened={setIsOpened}>Profile</PageLink>
        <hr />
        <PageLink href="/auth/log-out" setIsOpened={setIsOpened}>Log Out</PageLink>
      </div>
    );
  }

  return (
    <div className="w-1/3 sm:hidden">
      <PageLink href="/" setIsOpened={setIsOpened}>Home</PageLink>
      <hr />
      <PageLink href="/app/about" setIsOpened={setIsOpened}>About</PageLink>
      <hr />
      <PageLink href="/auth/sign-up" setIsOpened={setIsOpened}>Sign up</PageLink>
      <hr />
      <PageLink href="/auth/log-in" setIsOpened={setIsOpened}>Log in</PageLink>
    </div>
  );
}
