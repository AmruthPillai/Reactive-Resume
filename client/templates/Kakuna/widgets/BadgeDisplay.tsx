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
    <ul className="my-1 flex flex-wrap items-start justify-center gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg px-2 py-0.5 text-xs"
          style={{
            color: contrast === 'dark' ? theme.text : theme.background,
            backgroundColor: theme.primary,
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BadgeDisplay;
