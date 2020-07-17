import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const SkillItem = (x) => (
  <div key={x.id} className="flex flex-col">
    <h6 className="font-semibold">{x.name}</h6>
    <span className="text-xs">{x.level}</span>
  </div>
);

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <div className="grid grid-cols-2 row-gap-2 col-gap-4">
        {data.skills.items.map(SkillItem)}
      </div>
    </div>
  ) : null;
};

export default memo(SkillsA);
