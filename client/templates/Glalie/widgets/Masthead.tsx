import { Cake, Email, Phone, Public, Room } from '@mui/icons-material';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import getProfileIcon from '@/utils/getProfileIcon';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

export const MastheadSidebar: React.FC = () => {
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const primaryColor: string = useAppSelector((state) => get(state.resume.present, 'metadata.theme.primary'));
  const { name, headline, photo, email, phone, birthdate, website, location, profiles } = useAppSelector(
    (state) => state.resume.present.basics,
  );

  return (
    <div className="col-span-2 grid justify-items-center gap-4">
      {photo.visible && !isEmpty(photo.url) && (
        <img
          alt={name}
          src={photo.url}
          width={photo.filters.size}
          height={photo.filters.size}
          className={getPhotoClassNames(photo.filters)}
        />
      )}

      <div className="text-center">
        <h1>{name}</h1>
        <p className="mt-1 opacity-75">{headline}</p>
      </div>

      <div className="flex flex-col gap-2 rounded border-2 p-4" style={{ borderColor: primaryColor }}>
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
  const { summary } = useAppSelector((state) => state.resume.present.basics);

  return <Markdown>{summary}</Markdown>;
};
