import Image from 'next/image';
import { ItemBox } from '../atoms';
import BoxElement from './BoxElement';

export interface StatBoxProps {
  title: string;
  value?: number | string | null;
  icon?: string;
  className?: string;
}

export default function StatBox({
  title,
  value,
  icon,
  className = '',
}: StatBoxProps) {
  return (
    <ItemBox className={className}>
      <BoxElement title={title} className="mb-2">
        <div className="flex justify-between">
          <b>{value}</b>
          {icon
          && <Image src={icon} alt="Stat icon" width="20%" height="20%" />}
        </div>
      </BoxElement>
    </ItemBox>
  );
}
