import React from 'react';
import TextArea from '../../../shared/TextArea';

const ObjectiveTab = ({ data, onChange }) => {
  return (
    <div>
      <TextArea
        rows="15"
        label="Objective"
        placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
        value={data.objective.body}
        onChange={v => onChange('data.objective.body', v)}
      />
    </div>
  );
};

export default ObjectiveTab;
