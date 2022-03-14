import { Email, Phone, Public, Room } from '@mui/icons-material';
import { Theme } from '@reactive-resume/schema';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import getProfileIcon from '@/utils/getProfileIcon';
import { getContrastColor } from '@/utils/styles';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

export const MastheadSidebar: React.FC = () => {
  const { name, photo, email, phone, website, location, profiles } = useAppSelector((state) => state.resume.basics);

  return (
    <div className="col-span-2 grid justify-items-left gap-4">
      {photo.visible && !isEmpty(photo.url) && (
        <div className="relative aspect-square h-full w-full">
          <img alt={name} src={photo.url} className={getPhotoClassNames(photo.filters)} />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <DataDisplay icon={<Room />} className="text-xs">
          {formatLocation(location)}
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
          <DataDisplay key={id} icon={getProfileIcon(network)} link={url} className="text-xs">
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export const MastheadMain: React.FC = () => {
  const theme: Theme = useAppSelector((state) => get(state.resume, 'metadata.theme', {}));
  const contrast = useMemo(() => getContrastColor(theme.primary), [theme.primary]);

  const { name, summary, headline } = useAppSelector((state) => state.resume.basics);

  return (
    <div
      className="grid gap-2 p-4"
      style={{ color: contrast === 'dark' ? theme.text : theme.background, backgroundColor: theme.primary }}
    >
      <div>
        <h1>{name}</h1>
        <p className="opacity-75">{headline}</p>
      </div>

      <hr className="opacity-25" />

      <Markdown>{summary}</Markdown>
    </div>
  );
};
