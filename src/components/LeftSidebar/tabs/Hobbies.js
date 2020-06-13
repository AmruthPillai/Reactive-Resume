import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import TextField from '../../../shared/TextField';
import { addItem, deleteItem, moveItemUp, moveItemDown } from '../../../utils';
import ItemHeading from '../../../shared/ItemHeading';

const HobbiesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="my-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={data.hobbies.enable}
            onChange={v => onChange('data.hobbies.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={data.hobbies.heading}
            onChange={v => onChange('data.hobbies.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      {data.hobbies.items.map((x, index) => (
        <Item item={x} key={index} index={index} onChange={onChange} dispatch={dispatch} />
      ))}

      <AddItem heading={data.hobbies.heading} dispatch={dispatch} />
    </>
  );
};

const Form = ({ item, onChange }) => {
  return (
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      placeholder="Beatboxing"
      value={item.hobby}
      onChange={e => onChange(e.target.value)}
      type="text"
    />
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
      id: uuidv4(),
      hobby: ''
  });

  const add = () => {
    if (item.hobby === '') return;

    addItem(dispatch, 'hobbies', item);

    setItem({
        id: uuidv4(),
        hobby: ''
    });
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <Form item={item} onChange={v => setItem({...item, hobby: v})} />
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
  const identifier = `data.hobbies.items[${index}]`;

  return (
    <div className="my-4 grid grid-cols-12">
      <div className="col-span-9">
        <Form item={item} onChange={v => onChange(identifier, v)} />
      </div>

      <button
        type="button"
        onClick={() => moveItemUp(dispatch, 'hobbies', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">arrow_upward</i>
        </div>
      </button>

      <button
        type="button"
        onClick={() => moveItemDown(dispatch, 'hobbies', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">arrow_downward</i>
        </div>
      </button>

      <button
        type="button"
        onClick={() => deleteItem(dispatch, 'hobbies', item)}
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium"
      >
        <div className="flex justify-end items-center">
          <i className="material-icons font-bold text-lg">close</i>
        </div>
      </button>
    </div>
  );
};

export default HobbiesTab;
