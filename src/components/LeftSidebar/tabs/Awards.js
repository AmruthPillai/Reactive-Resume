import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import TextArea from '../../../shared/TextArea';
import { addItem } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

const AwardsTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.awards.enable}
            onChange={v => onChange('data.awards.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.awards.heading}
            onChange={v => onChange('data.awards.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.awards.items.map((x, index) => (
        <Item
          item={x}
          key={x.id}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === data.awards.items.length - 1}
        />
      ))}

      <AddItem heading={data.awards.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['leftSidebar', 'app']);

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('awards.title.label')}
        placeholder="Code For Good Hackathon"
        value={item.title}
        onChange={v => onChange(`${identifier}title`, v)}
      />

      <TextField
        className="mb-6"
        label={t('awards.subtitle.label')}
        placeholder="First Place, National Level"
        value={item.subtitle}
        onChange={v => onChange(`${identifier}subtitle`, v)}
      />

      <TextArea
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
    title: '',
    subtitle: '',
    description: '',
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.title === '') return;

    addItem(dispatch, 'awards', item);

    setItem({
      id: uuidv4(),
      enable: true,
      title: '',
      subtitle: '',
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
  const identifier = `data.awards.items[${index}].`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading title={item.title} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />

        <ItemActions
          dispatch={dispatch}
          first={first}
          identifier={identifier}
          item={item}
          last={last}
          onChange={onChange}
          type="awards"
        />
      </div>
    </div>
  );
};

export default AwardsTab;
