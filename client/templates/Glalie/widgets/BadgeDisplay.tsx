import { alpha } from '@mui/material';
import { Theme } from '@reactive-resume/schema';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { getContrastColor } from '@/utils/styles';

type Props = {
  items: string[];
};

const BadgeDisplay: React.FC<Props> = ({ items }) => {
  const theme: Theme = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {}));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);

  if (!isArray(items) || isEmpty(items)) return null;

  return (
    <ul className="mt-1 flex flex-wrap gap-2 text-xs">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm px-2 py-0.5"
          style={{
            color: contrast === 'dark' ? theme.text : theme.background,
            backgroundColor: alpha(theme.primary, 0.75),
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BadgeDisplay;
