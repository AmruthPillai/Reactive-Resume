import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck, isItemVisible } from '../../../utils';

const SkillItem = (x) => (
  <li key={x.id} className="text-sm py-1">
    {x.skill}
  </li>
);

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <ul>{data.skills.items.map((x) => isItemVisible(x) && SkillItem(x))}</ul>
    </div>
  ) : null;
};

export default memo(SkillsA);
