import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';

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
      <AddItem dispatch={dispatch} />
    </>
  );
};

const AddItem = ({ dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    name: '',
    major: '',
    start: '',
    end: '',
    grade: '',
    description: '',
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const addItem = () => {
    if (item.name === '' || item.major === '') return;

    dispatch({
      type: 'add_item',
      payload: {
        key: 'education',
        value: item,
      },
    });

    setItem({
      id: uuidv4(),
      title: '',
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
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">Add Education</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Name"
          className="mb-6"
          placeholder="Harvard University"
          value={item.name}
          onChange={v => onChange('name', v)}
        />

        <TextField
          label="Major"
          className="mb-6"
          placeholder="Masters in Computer Science"
          value={item.major}
          onChange={v => onChange('major', v)}
        />

        <TextField
          label="Grade"
          className="mb-6"
          placeholder="7.2 CGPA"
          value={item.grade}
          onChange={v => onChange('grade', v)}
        />

        <div className="grid grid-cols-2 col-gap-4">
          <TextField
            label="Start Date"
            className="mb-6"
            placeholder="March 2018"
            value={item.start}
            onChange={v => onChange('start', v)}
          />

          <TextField
            label="End Date"
            className="mb-6"
            placeholder="May 2020"
            value={item.end}
            onChange={v => onChange('end', v)}
          />
        </div>

        <TextArea
          rows="5"
          className="mb-6"
          label="Description"
          placeholder="You can write about projects or special credit classes that you took while studying at this school."
          value={item.description}
          onChange={v => onChange('description', v)}
        />

        <button
          type="button"
          onClick={addItem}
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
  const identifier = `data.education.items[${index}]`;

  const deleteItem = () =>
    dispatch({
      type: 'delete_item',
      payload: {
        key: 'education',
        value: item,
      },
    });

  const moveItemUp = () =>
    dispatch({
      type: 'move_item_up',
      payload: {
        key: 'education',
        value: item,
      },
    });

  const moveItemDown = () =>
    dispatch({
      type: 'move_item_down',
      payload: {
        key: 'education',
        value: item,
      },
    });

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
          placeholder="Harvard University"
          value={item.name}
          onChange={v => onChange(`${identifier}.name`, v)}
        />

        <TextField
          label="Major"
          className="mb-6"
          placeholder="Masters in Computer Science"
          value={item.major}
          onChange={v => onChange(`${identifier}.major`, v)}
        />

        <TextField
          label="Grade"
          className="mb-6"
          placeholder="7.2 CGPA"
          value={item.grade}
          onChange={v => onChange(`${identifier}.grade`, v)}
        />

        <div className="grid grid-cols-2 col-gap-4">
          <TextField
            label="Start Date"
            className="mb-6"
            placeholder="March 2018"
            value={item.start}
            onChange={v => onChange(`${identifier}.start`, v)}
          />

          <TextField
            label="End Date"
            className="mb-6"
            placeholder="May 2020"
            value={item.end}
            onChange={v => onChange(`${identifier}.end`, v)}
          />
        </div>

        <TextArea
          rows="5"
          className="mb-6"
          label="Description"
          placeholder="You can write about projects or special credit classes that you took while studying at this school."
          value={item.description}
          onChange={v => onChange(`${identifier}.description`, v)}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={deleteItem}
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
                onClick={moveItemUp}
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
                onClick={moveItemDown}
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

export default EducationTab;
