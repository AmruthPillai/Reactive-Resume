import { Email, Phone, Public, Room } from '@mui/icons-material';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
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
    <div className="mb-4 border-b pb-4 text-center">
      {photo.visible && !isEmpty(photo.url) && (
        <Image
          alt={name}
          src={photo.url}
          width={photo.filters.size}
          height={photo.filters.size}
          objectFit="cover"
          className={getPhotoClassNames(photo.filters)}
        />
      )}

      <h1 className="mt-2 mb-1">{name}</h1>
      <p className="opacity-75">{headline}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
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
          <DataDisplay key={id} icon={getProfileIcon(network)} link={url}>
            {username}
          </DataDisplay>
        ))}
      </div>
    </div>
  );
};

export default Masthead;
