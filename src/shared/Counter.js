import React from 'react';

const Counter = ({ label, value, onDecrement, onIncrement, className }) => {
  return (
    <div className={className}>
      <label className="uppercase tracking-wide text-gray-600 text-xs font-semibold mb-2">
        {label}
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          type="button"
          onClick={onDecrement}
          className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer px-2"
        >
          <span className="m-auto text-2xl">−</span>
        </button>
        <input
          readOnly
          type="number"
          className="text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-600"
          value={value}
        />
        <button
          type="button"
          onClick={onIncrement}
          className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer px-2"
        >
          <span className="m-auto text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default Counter;
