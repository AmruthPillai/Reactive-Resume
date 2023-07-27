import get from 'lodash/get';
import { ThemeConfig } from 'schema';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <h3
      className="mb-2 inline-block border-b-2 pb-1 font-bold uppercase opacity-75"
      style={{ borderColor: theme.primary, color: theme.primary, display: 'inline-block' }}
    >
      {children}
    </h3>
  );
};

export default Heading;
