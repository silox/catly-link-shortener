import React from 'react';

export interface ItemBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function ItemBox({
  children,
  className = '',
  ...props
}: ItemBoxProps) {
  return (
    <div className={`bg-boxcolor m-2 px-4 py-4 rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  );
}
