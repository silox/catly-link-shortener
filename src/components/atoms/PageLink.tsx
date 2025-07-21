import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

export interface PageLinkProps {
  href: string;
  children: React.ReactNode;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function PageLink({
  href,
  children,
  setIsOpened,
  className = '',
  ...props
}: PageLinkProps) {
  return (
    <Link href={href} {...props} passHref>
      <a
        className={`block p-1 sm:inline text-white sm:px-5 font-primary ${className}`}
        onClick={() => setIsOpened(false)}
        role="button"
        tabIndex={0}
      >
        {children}
      </a>
    </Link>
  );
}
