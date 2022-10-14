import { ThemeConfig } from '@reactive-resume/schema';
import get from 'lodash/get';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {}));

  return (
    <h4 className="mb-2 font-bold uppercase" style={{ color: theme.primary }}>
      {children}
    </h4>
  );
};

export default Heading;
