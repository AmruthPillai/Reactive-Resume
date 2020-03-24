import React from 'react';

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <ul id="tabs" className="my-4 flex items-center overflow-x-scroll">
      {tabs.map(tab =>
        currentTab === tab ? (
          <li key={tab} className="mx-1">
            <div className="whitespace-no-wrap bg-gray-700 text-white rounded-md text-sm py-2 px-6 font-medium">
              {tab}
            </div>
          </li>
        ) : (
          <li key={tab} className="mx-1">
            <div
              className="bg-white whitespace-no-wrap rounded-md cursor-pointer text-sm py-2 px-6 font-medium hover:bg-gray-200"
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default TabBar;
