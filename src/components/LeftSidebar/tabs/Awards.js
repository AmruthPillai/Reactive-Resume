import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import TextArea from '../../../shared/TextArea';
import { addItem, deleteItem, moveItemUp, moveItemDown } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';

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

      <AddItem dispatch={dispatch} />
    </>
  );
};

const AddItem = ({ dispatch }) => {
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
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">Add Award</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Title"
          className="mb-6"
          placeholder="Math &amp; Science Olympiad"
          value={item.title}
          onChange={v => onChange('title', v)}
        />

        <TextField
          label="Subtitle"
          className="mb-6"
          placeholder="First Place, International Level"
          value={item.subtitle}
          onChange={v => onChange('subtitle', v)}
        />

        <TextArea
          label="Description"
          className="mb-6"
          value={item.description}
          onChange={v => onChange('description', v)}
        />

        <button
          type="button"
          onClick={onSubmit}
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex items-center">
            <i className="material-icons mr-2 font-bold text-base">add</i>
            <span className="text-sm">Add</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.awards.items[${index}]`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">{item.title}</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Title"
          className="mb-6"
          placeholder="Math &amp; Science Olympiad"
          value={item.title}
          onChange={v => onChange(`${identifier}.title`, v)}
        />

        <TextField
          label="Subtitle"
          className="mb-6"
          placeholder="First Place, International Level"
          value={item.subtitle}
          onChange={v => onChange(`${identifier}.subtitle`, v)}
        />

        <TextArea
          label="Description"
          className="mb-6"
          value={item.description}
          onChange={v => onChange(`${identifier}.description`, v)}
        />

        <ItemActions
          item={item}
          onChange={onChange}
          type="awards"
          identifier={identifier}
          dispatch={dispatch}
          deleteItem={deleteItem}
          first={first}
          moveItemUp={moveItemUp}
          last={last}
          moveItemDown={moveItemDown}
        />
      </div>
    </div>
  );
};

export default AwardsTab;
