import { Cake, Email, Phone, Public, Room } from '@mui/icons-material';
import { alpha } from '@mui/material';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { ThemeConfig } from 'schema';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import getProfileIcon from '@/utils/getProfileIcon';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

const Masthead: React.FC = () => {
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const { name, photo, headline, summary, email, phone, birthdate, website, location, profiles } = useAppSelector(
    (state) => state.resume.present.basics,
  );
  const theme: ThemeConfig = useAppSelector((state) => get(state.resume.present, 'metadata.theme', {} as ThemeConfig));

  return (
    <div>
      <div className="flex items-center gap-4 p-6" style={{ backgroundColor: alpha(theme.primary, 0.2) }}>
        <div className="grid flex-1 gap-1">
          <h1>{name}</h1>
          <p style={{ color: theme.primary }}>{headline}</p>
          <p className="opacity-75">
            <Markdown>{summary}</Markdown>
          </p>
        </div>

        {photo.visible && !isEmpty(photo.url) && (
          <img
            alt={name}
            src={photo.url}
            width={photo.filters.size}
            height={photo.filters.size}
            className={getPhotoClassNames(photo.filters)}
          />
        )}
      </div>
      <div
        className="grid gap-y-2 px-8 py-4"
        style={{ backgroundColor: alpha(theme.primary, 0.4), gridTemplateColumns: `repeat(2, minmax(0, 1fr))` }}
      >
        <DataDisplay icon={<Room />} className="col-span-2">
          {formatLocation(location)}
        </DataDisplay>

        <DataDisplay icon={<Cake />}>{formatDateString(birthdate, dateFormat)}</DataDisplay>

        <DataDisplay icon={<Email />} link={`mailto:${email}`}>
          {email}
        </DataDisplay>

        <DataDisplay icon={<Phone />} link={`tel:${phone}`}>
          {phone}
        </DataDisplay>

        <DataDisplay icon={<Public />} link={addHttp(website)}>
          {website}
        </DataDisplay>

        {profiles.map(({ id, username, network, url }) => (
          <DataDisplay key={id} icon={getProfileIcon(network)} link={url && addHttp(url)}>
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export default Masthead;
