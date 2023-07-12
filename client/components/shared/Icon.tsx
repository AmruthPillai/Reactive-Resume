import clsx from 'clsx';
import Image from 'next/image';

import { useAppSelector } from '@/store/hooks';

type Props = {
  className?: string;
  size?: 256 | 96 | 64 | 48 | 40 | 32 | 24 | 16;
};

const Icon: React.FC<Props> = ({ size = 64, className }) => {
  const theme = useAppSelector((state) => state.build.theme);
  const iconTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <Image
      alt="Reactive Resume"
      src={`/icon/${iconTheme}.svg`}
      className={clsx('rounded', className)}
      width={size}
      height={size}
      priority
    />
  );
};

export default Icon;
