import React from 'react';

export interface BoxElementProps {
  title: string;
  textColor?: string;
  children: React.ReactNode;
  className?: string;
}

export default function BoxElement({
  title,
  textColor = 'text-[#949494]',
  children,
  className = '',
}: BoxElementProps) {
  return (
    <div>
      <div className={`${textColor} sm:text-lg font-bold ${className}`}>
        {title}
      </div>
      {children}
    </div>
  );
}
