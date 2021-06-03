import React, { memo, useContext } from 'react';
import { isItemVisible, safetyCheck } from '../../../utils';
import PageContext from '../../../contexts/PageContext';

const SkillItem = ({ id, skill }) => (
  <li key={id} className="text-sm py-1">
    {skill}
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
