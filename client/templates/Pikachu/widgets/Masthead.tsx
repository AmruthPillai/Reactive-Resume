import { Cake, Email, Phone, Public, Room } from '@mui/icons-material';
import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { ThemeConfig } from 'schema';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import getProfileIcon from '@/utils/getProfileIcon';
import { getContrastColor } from '@/utils/styles';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

export const MastheadSidebar: React.FC = () => {
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const { name, photo, email, phone, birthdate, website, location, profiles } = useAppSelector(
    (state) => state.resume.present.basics,
  );

  return (
    <div className="col-span-2 grid justify-items-start gap-4">
      {photo.visible && !isEmpty(photo.url) && (
        <img
          alt={name}
          src={photo.url}
          width={photo.filters.size}
          height={photo.filters.size}
          className={getPhotoClassNames(photo.filters)}
        />
      )}

      <div className="flex flex-col gap-2">
        <DataDisplay icon={<Room />} className="text-xs">
          {formatLocation(location)}
        </DataDisplay>

        <DataDisplay icon={<Cake />} className="text-xs">
          {formatDateString(birthdate, dateFormat)}
        </DataDisplay>

        <DataDisplay icon={<Email />} className="text-xs" link={`mailto:${email}`}>
          {email}
        </DataDisplay>

        <DataDisplay icon={<Phone />} className="text-xs" link={`tel:${phone}`}>
          {phone}
        </DataDisplay>

        <DataDisplay icon={<Public />} link={addHttp(website)} className="text-xs">
          {website}
        </DataDisplay>

        {profiles.map(({ id, username, network, url }) => (
          <DataDisplay key={id} icon={getProfileIcon(network)} link={url && addHttp(url)} className="text-xs">
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export const MastheadMain: React.FC = () => {
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);

  const { name, summary, headline } = useAppSelector((state) => state.resume.present.basics);

  return (
    <div
      className="grid gap-2 p-4"
      style={{ color: contrast === 'dark' ? theme.text : theme.background, backgroundColor: theme.primary }}
    >
      <div className={clsx({ invert: contrast === 'light' })}>
        <h1>{name}</h1>
        <p className="opacity-75">{headline}</p>
      </div>

      <hr className="opacity-25" />

      <Markdown className={clsx({ invert: contrast === 'light' })}>{summary}</Markdown>
    </div>
  );
};
