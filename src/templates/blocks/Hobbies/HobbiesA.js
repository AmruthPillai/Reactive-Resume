import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const HobbyA = (x) => (
  <div key={x.id}>
    <h6 className="font-semibold text-sm">{x.name}</h6>
  </div>
);

const HobbiesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.hobbies) ? (
    <div>
      <Heading>{data.hobbies.heading}</Heading>
      <div className="grid gap-2">{data.hobbies.items.map(HobbyA)}</div>
    </div>
  ) : null;
};

export default memo(HobbiesA);
