import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const SkillItem = (x) => (
  <div key={x.id} className="mb-2">
    <h6 className="font-semibold">{x.name}</h6>
    <p className="text-xs">{x.level}</p>
  </div>
);

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return data.skills.visible && data.skills.items ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      {data.skills.items.map(SkillItem)}
    </div>
  ) : null;
};

export default memo(SkillsA);
