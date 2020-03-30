import React from 'react';

import Checkbox from './Checkbox';
import { deleteItem, moveItemUp, moveItemDown } from '../utils';

const ItemActions = ({ dispatch, first, identifier, item, last, onChange, type }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Checkbox
          size="2.25rem"
          checked={item.enable}
          onChange={v => {
            onChange(`${identifier}enable`, v);
          }}
        />

        <button
          type="button"
          onClick={() => deleteItem(dispatch, type, item)}
          className="ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex items-center">
            <i className="material-icons mr-2 font-bold text-base">delete</i>
            <span className="text-sm">Delete</span>
          </div>
        </button>
      </div>

      <div className="flex">
        {!first && (
          <button
            type="button"
            onClick={() => moveItemUp(dispatch, type, item)}
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
            onClick={() => moveItemDown(dispatch, type, item)}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            <div className="flex items-center">
              <i className="material-icons font-bold text-base">arrow_downward</i>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemActions;
