import { ThemeConfig } from '@reactive-resume/schema';
import get from 'lodash/get';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <h2
      className="mb-2 pb-1 font-bold uppercase opacity-75"
      style={{ borderBottomWidth: '3px', borderColor: theme.primary, color: theme.primary, display: 'inline-block' }}
    >
      {children}
    </h2>
  );
};

export default Heading;
