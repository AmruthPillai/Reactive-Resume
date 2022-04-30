import { useHotkeys } from 'react-hotkeys-hook';

import { toggleSidebar } from '@/store/build/buildSlice';
import { useAppDispatch } from '@/store/hooks';

const HotkeysWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useAppDispatch();

  useHotkeys('ctrl+/, cmd+/', () => {
    dispatch(toggleSidebar({ sidebar: 'left' }));
    dispatch(toggleSidebar({ sidebar: 'right' }));
  });

  return <>{children}</>;
};

export default HotkeysWrapper;
