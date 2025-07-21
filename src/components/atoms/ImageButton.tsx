import React from 'react';
import Image from 'next/image';

export interface ButtonProps {
  onClick: () => void;
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

export default function ImageButton({
  onClick,
  src,
  width = '100%',
  height = '100%',
  alt = '',
}: ButtonProps) {
  return (
    <button onClick={onClick} type="button">
      <Image src={src} alt={alt} width={width} height={height} />
    </button>
  );
}
