import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const HobbyA = (x) => (
  <div key={x.id} className="mb-2">
    <h6 className="font-semibold">{x.name}</h6>
  </div>
);

const HobbiesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.hobbies.visible && data.hobbies.items ? (
    <div>
      <Heading>{data.hobbies.heading}</Heading>
      {data.hobbies.items.map(HobbyA)}
    </div>
  ) : null;
};

export default memo(HobbiesA);
