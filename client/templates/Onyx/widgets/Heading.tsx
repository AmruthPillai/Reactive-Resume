import get from 'lodash/get';
import { ThemeConfig } from 'schema';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <h4 className="mb-2 font-bold uppercase" style={{ color: theme.primary }}>
      {children}
    </h4>
  );
};

export default Heading;
