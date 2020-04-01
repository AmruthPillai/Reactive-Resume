import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

const EducationTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.education.enable}
            onChange={v => onChange('data.education.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.education.heading}
            onChange={v => onChange('data.education.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.education.items.map((x, index) => (
        <Item
          item={x}
          key={x.id}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === data.education.items.length - 1}
        />
      ))}

      <AddItem heading={data.education.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('education.name.label')}
        placeholder="Harvard University"
        value={item.name}
        onChange={v => onChange(`${identifier}name`, v)}
      />

      <TextField
        className="mb-6"
        label={t('education.major.label')}
        placeholder="Masters in Computer Science"
        value={item.major}
        onChange={v => onChange(`${identifier}major`, v)}
      />

      <TextField
        className="mb-6"
        label={t('education.grade.label')}
        placeholder="7.2 CGPA"
        value={item.grade}
        onChange={v => onChange(`${identifier}grade`, v)}
      />

      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('app:item.startDate.label')}
          placeholder="March 2018"
          value={item.start}
          onChange={v => onChange(`${identifier}start`, v)}
        />

        <TextField
          className="mb-6"
          label={t('app:item.endDate.label')}
          placeholder="June 2022"
          value={item.end}
          onChange={v => onChange(`${identifier}end`, v)}
        />
      </div>

      <TextArea
        rows="5"
        className="mb-6"
        label={t('app:item.description.label')}
        value={item.description}
        onChange={v => onChange(`${identifier}description`, v)}
      />
    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    enable: true,
    name: '',
    major: '',
    start: '',
    end: '',
    grade: '',
    description: '',
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.name === '' || item.major === '') return;

    addItem(dispatch, 'education', item);

    setItem({
      id: uuidv4(),
      enable: true,
      name: '',
      role: '',
      start: '',
      end: '',
      grade: '',
      description: '',
    });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} />
        <AddItemButton onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.education.items[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={item.name} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="education"
        />
      </div>
    </div>
  );
};

export default EducationTab;
