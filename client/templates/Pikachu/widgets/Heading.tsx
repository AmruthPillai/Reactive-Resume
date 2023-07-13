import get from 'lodash/get';
import { ThemeConfig } from 'schema';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <h3
      className="mb-2 w-2/3 border-b-2 pb-1.5 font-bold uppercase"
      style={{ color: theme.primary, borderColor: theme.primary }}
    >
      {children}
    </h3>
  );
};

export default Heading;
