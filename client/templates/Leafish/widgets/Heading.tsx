import { Theme } from '@reactive-resume/schema';
import get from 'lodash/get';

import { useAppSelector } from '@/store/hooks';

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme: Theme = useAppSelector((state) => get(state.resume, 'metadata.theme', {}));

  return (
    <h2
      className="pb-1 mb-2 font-bold uppercase opacity-75"
      style={{ borderBottomWidth: '3px', borderColor: theme.primary, color: theme.primary, display: 'inline-block' }}
    >
      {children}
    </h2>
  );
};

export default Heading;
