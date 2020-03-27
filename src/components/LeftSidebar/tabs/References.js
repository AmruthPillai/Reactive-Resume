import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem, deleteItem, moveItemUp, moveItemDown } from '../../../utils';

const ReferencesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    if (!('references' in data)) {
      dispatch({
        type: 'migrate_section',
        payload: {
          key: 'references',
          value: {
            enable: false,
            heading: 'References',
            items: [],
          },
        },
      });

      dispatch({ type: 'save_data' });
    }
  }, [data, dispatch]);

  return (
    'references' in data && (
      <>
        <div className="mb-6 grid grid-cols-6 items-center">
          <div className="col-span-1">
            <Checkbox
              checked={data.references.enable}
              onChange={v => onChange('data.references.enable', v)}
            />
          </div>
          <div className="col-span-5">
            <TextField
              placeholder="Heading"
              value={data.references.heading}
              onChange={v => onChange('data.references.heading', v)}
            />
          </div>
        </div>

        <hr className="my-6" />

        {data.references.items.map((x, index) => (
          <Item
            item={x}
            key={x.id}
            index={index}
            onChange={onChange}
            dispatch={dispatch}
            first={index === 0}
            last={index === data.references.items.length - 1}
          />
        ))}

        <AddItem dispatch={dispatch} />
      </>
    )
  );
};

const AddItem = ({ dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    name: '',
    position: '',
    phone: '',
    email: '',
    description: '',
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.name === '' || item.position === '') return;

    addItem(dispatch, 'references', item);

    setItem({
      id: uuidv4(),
      name: '',
      position: '',
      phone: '',
      email: '',
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
        <h6 className="text-sm font-medium">Add Reference</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Name"
          className="mb-6"
          placeholder="Steve Jobs"
          value={item.name}
          onChange={v => onChange('name', v)}
        />

        <TextField
          label="Position"
          className="mb-6"
          placeholder="CEO of Apple"
          value={item.position}
          onChange={v => onChange('position', v)}
        />

        <TextField
          label="Phone Number"
          className="mb-6"
          placeholder="+1 123 456 7890"
          value={item.phone}
          onChange={v => onChange('phone', v)}
        />

        <TextField
          label="Email Address"
          className="mb-6"
          placeholder="steve@apple.com"
          value={item.email}
          onChange={v => onChange('email', v)}
        />

        <TextArea
          rows="5"
          className="mb-6"
          label="Description"
          placeholder="You can write about how you and the reference contact worked together and which projects you were a part of."
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
  const identifier = `data.references.items[${index}]`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">{item.name}</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Name"
          className="mb-6"
          placeholder="Steve Jobs"
          value={item.name}
          onChange={v => onChange(`${identifier}.name`, v)}
        />

        <TextField
          label="Position"
          className="mb-6"
          placeholder="CEO of Apple"
          value={item.position}
          onChange={v => onChange(`${identifier}.position`, v)}
        />

        <TextField
          label="Phone Number"
          className="mb-6"
          placeholder="+1 123 456 7890"
          value={item.phone}
          onChange={v => onChange(`${identifier}.phone`, v)}
        />

        <TextField
          label="Email Address"
          className="mb-6"
          placeholder="steve@apple.com"
          value={item.email}
          onChange={v => onChange(`${identifier}.email`, v)}
        />

        <TextArea
          rows="5"
          className="mb-6"
          label="Description"
          placeholder="You can write about how you and the reference contact worked together and which projects you were a part of."
          value={item.description}
          onChange={v => onChange(`${identifier}.description`, v)}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => deleteItem(dispatch, 'references', item)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex items-center">
              <i className="material-icons mr-2 font-bold text-base">delete</i>
              <span className="text-sm">Delete</span>
            </div>
          </button>

          <div className="flex">
            {!first && (
              <button
                type="button"
                onClick={() => moveItemUp(dispatch, 'references', item)}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded mr-2"
              >
                <div className="flex items-center">
                  <i className="material-icons font-bold text-base">arrow_upward</i>
                </div>
              </button>
            )}

            {!last && (
              <button
                type="button"
                onClick={() => moveItemDown(dispatch, 'references', item)}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
              >
                <div className="flex items-center">
                  <i className="material-icons font-bold text-base">arrow_downward</i>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesTab;
