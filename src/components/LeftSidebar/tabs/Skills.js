import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import TextField from '../../../shared/TextField';
import { addItem, deleteItem, moveItemUp, moveItemDown } from '../../../utils';
import ItemHeading from '../../../shared/ItemHeading';

const SkillsTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="my-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.skills.enable}
            onChange={v => onChange('data.skills.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.skills.heading}
            onChange={v => onChange('data.skills.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.skills.items.map((x, index) => (
        <Item item={x} key={x.id} index={index} onChange={onChange} dispatch={dispatch} />
      ))}

      <AddItem heading={data.skills.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange }) => {
  return (
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      placeholder="Team Building &amp; Training"
      value={item.skill}
      onChange={e => onChange(e.target.value)}
      type="text"
    />
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    skill: ''
  });

  const add = () => {
    if (item.skill === '') return;

    addItem(dispatch, 'skills', item);

    setItem({
        id: uuidv4(),
        skill: ''
    });
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <Form item={item} onChange={v => setItem({...item, skill: v})} />
          </div>

          <button
            type="button"
            onClick={add}
            className="col-span-1 bg-gray-600 hover:bg-gray-700 text-sm font-medium rounded"
          >
            <div className="flex justify-center items-center">
              <i className="material-icons font-bold text-white text-lg">add</i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch }) => {
  const identifier = `data.skills.items[${index}]`;

  return (
    <div className="my-4 grid grid-cols-12">
      <div className="col-span-9">
        <Form item={item} onChange={v => onChange(identifier, {...item, skill: v})} />
      </div>

      <button
        type="button"
        onClick={() => moveItemUp(dispatch, 'skills', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">arrow_upward</i>
        </div>
      </button>

      <button
        type="button"
        onClick={() => moveItemDown(dispatch, 'skills', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">arrow_downward</i>
        </div>
      </button>

      <button
        type="button"
        onClick={() => deleteItem(dispatch, 'skills', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">close</i>
        </div>
      </button>
    </div>
  );
};

export default SkillsTab;
