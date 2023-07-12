import clsx from 'clsx';
import Image from 'next/image';

import { useAppSelector } from '@/store/hooks';

type Props = {
  className?: string;
  size?: 256 | 96 | 64 | 48 | 40 | 32 | 24 | 16;
};

const Logo: React.FC<Props> = ({ size = 64, className }) => {
  const theme = useAppSelector((state) => state.build.theme);

  return (
    <Image
      alt="Reactive Resume"
      src={`/logo/${theme}.svg`}
      className={clsx('rounded', className)}
      width={size}
      height={size}
      priority
    />
  );
};

export default Logo;
