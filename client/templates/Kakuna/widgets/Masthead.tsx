import { Email, Phone, Public, Room } from '@mui/icons-material';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { useAppSelector } from '@/store/hooks';
import DataDisplay from '@/templates/shared/DataDisplay';
import getProfileIcon from '@/utils/getProfileIcon';
import { addHttp, formatLocation, getPhotoClassNames } from '@/utils/template';

const Masthead = () => {
  const { name, photo, email, phone, website, headline, location, profiles } = useAppSelector(
    (state) => state.resume.basics
  );

  return (
    <div className="grid gap-3 justify-center mb-4 border-b pb-4 text-center">
      <div className="mx-auto">
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

      <div>
        <h1 className="mb-1">{name}</h1>
        <p className="opacity-75">{headline}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <DataDisplay icon={<Email />} link={`mailto:${email}`}>
          {email}
        </DataDisplay>

        <DataDisplay icon={<Phone />} link={`tel:${phone}`}>
          {phone}
        </DataDisplay>

        <DataDisplay icon={<Public />} link={addHttp(website)}>
          {website}
        </DataDisplay>

        <DataDisplay icon={<Room />}>{formatLocation(location)}</DataDisplay>

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
