import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import Counter from '../../../shared/Counter';
import { addItem, deleteItem, moveItemUp, moveItemDown } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';

const LanguagesTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    if (!('languages' in data)) {
      dispatch({
        type: 'migrate_section',
        payload: {
          key: 'languages',
          value: {
            enable: false,
            heading: 'Languages',
            items: [],
          },
        },
      });

      dispatch({ type: 'save_data' });
    }
  }, [data, dispatch]);

  return (
    'languages' in data && (
      <>
        <div className="mb-6 grid grid-cols-6 items-center">
          <div className="col-span-1">
            <Checkbox
              checked={data.languages.enable}
              onChange={v => onChange('data.languages.enable', v)}
            />
          </div>
          <div className="col-span-5">
            <TextField
              placeholder="Heading"
              value={data.languages.heading}
              onChange={v => onChange('data.languages.heading', v)}
            />
          </div>
        </div>

        <hr className="my-6" />

        {data.languages.items.map((x, index) => (
          <Item
            item={x}
            key={x.id}
            index={index}
            onChange={onChange}
            dispatch={dispatch}
            first={index === 0}
            last={index === data.languages.items.length - 1}
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
    enable: true,
    key: '',
    value: 1,
  });

  const onChange = (key, value) => setItem(items => set({ ...items }, key, value));

  const onSubmit = () => {
    if (item.key === '') return;

    addItem(dispatch, 'languages', item);

    setItem({
      id: uuidv4(),
      enable: true,
      key: '',
      value: 1,
    });

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">Add Language</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Key"
          className="mb-6"
          placeholder="Dothraki"
          value={item.key}
          onChange={v => onChange('key', v)}
        />

        <Counter
          label="Rating"
          className="mb-6"
          value={item.value}
          onDecrement={() => item.value > 1 && onChange('value', item.value - 1)}
          onIncrement={() => item.value < 5 && onChange('value', item.value + 1)}
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
  const identifier = `data.languages.items[${index}]`;

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">{item.key}</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Name"
          className="mb-6"
          placeholder="Dothraki"
          value={item.key}
          onChange={v => onChange(`${identifier}.key`, v)}
        />

        <Counter
          label="Rating"
          className="mb-6"
          value={item.value}
          onDecrement={() => item.value > 1 && onChange(`${identifier}.value`, item.value - 1)}
          onIncrement={() => item.value < 5 && onChange(`${identifier}.value`, item.value + 1)}
        />

        <ItemActions
          item={item}
          onChange={onChange}
          type="languages"
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

export default LanguagesTab;
