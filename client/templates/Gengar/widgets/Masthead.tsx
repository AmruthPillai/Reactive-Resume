import { css } from '@emotion/css';
import { Cake, Email, Phone, Public, Room } from '@mui/icons-material';
import { alpha } from '@mui/material';
import { ThemeConfig } from 'schema';
import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import getProfileIcon from '@/utils/getProfileIcon';
import { getContrastColor } from '@/utils/styles';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

export const MastheadSidebar: React.FC = () => {
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const { name, headline, photo, email, phone, birthdate, website, location, profiles } = useAppSelector(
    (state) => state.resume.present.basics,
  );
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);
  const iconColor = useMemo(() => (contrast === 'dark' ? theme.text : theme.background), [theme, contrast]);

  return (
    <div className="col-span-2 grid justify-items-start gap-3 p-4">
      {photo.visible && !isEmpty(photo.url) && (
        <img
          alt={name}
          src={photo.url}
          width={photo.filters.size}
          height={photo.filters.size}
          className={getPhotoClassNames(photo.filters)}
        />
      )}

      <div className={clsx({ invert: contrast === 'light' })}>
        <h1 className="mb-1">{name}</h1>
        <p className="opacity-75">{headline}</p>
      </div>

      <div className={clsx('flex flex-col gap-2.5', css(`svg { color: ${iconColor} }`))}>
        <DataDisplay icon={<Room />} className="!gap-2 text-xs" textClassName={clsx({ invert: contrast === 'light' })}>
          {formatLocation(location)}
        </DataDisplay>

        <DataDisplay icon={<Cake />} className="!gap-2 text-xs" textClassName={clsx({ invert: contrast === 'light' })}>
          {formatDateString(birthdate, dateFormat)}
        </DataDisplay>

        <DataDisplay
          icon={<Email />}
          className="!gap-2 text-xs"
          link={`mailto:${email}`}
          textClassName={clsx({ invert: contrast === 'light' })}
        >
          {email}
        </DataDisplay>

        <DataDisplay
          icon={<Phone />}
          className="!gap-2 text-xs"
          link={`tel:${phone}`}
          textClassName={clsx({ invert: contrast === 'light' })}
        >
          {phone}
        </DataDisplay>

        <DataDisplay
          icon={<Public />}
          link={website && addHttp(website)}
          className="!gap-2 text-xs"
          textClassName={clsx({ invert: contrast === 'light' })}
        >
          {website}
        </DataDisplay>

        {profiles.map(({ id, username, network, url }) => (
          <DataDisplay
            key={id}
            icon={getProfileIcon(network)}
            link={url && addHttp(url)}
            className="!gap-2 text-xs"
            textClassName={clsx({ invert: contrast === 'light' })}
          >
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export const MastheadMain: React.FC = () => {
  const primaryColor: string = useAppSelector((state) => get(state.resume.present, 'metadata.theme.primary'));
  const backgroundColor: string = useMemo(() => alpha(primaryColor, 0.15), [primaryColor]);

  const { summary } = useAppSelector((state) => state.resume.present.basics);

  return (
    <div className="grid gap-2 p-4" style={{ backgroundColor }}>
      <Markdown>{summary}</Markdown>
    </div>
  );
};
