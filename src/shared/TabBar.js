import React, { useRef } from 'react';

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {
  const tabsRef = useRef(null);

  const scrollBy = x => {
    const index = tabs.findIndex(tab => tab.key === currentTab);
    tabsRef.current.scrollLeft += x;

    if (x < 0 && index > 0) {
      setCurrentTab(tabs[index - 1].key);
    }

    if (x > 0 && index < tabs.length - 1) {
      setCurrentTab(tabs[index + 1].key);
    }
  };

  return (
    <div className="mx-4 mb-6 flex items-center">
      <div
        className="flex mr-1 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => scrollBy(-100)}
      >
        <i className="material-icons">chevron_left</i>
      </div>

      <ul id="tabs" ref={tabsRef} className="flex overflow-x-scroll">
        {tabs.map(tab =>
          currentTab === tab.key ? (
            <li key={tab.key} className="mx-1 list-none">
              <div className="whitespace-no-wrap bg-gray-700 text-white rounded-md text-sm py-2 px-6 font-medium">
                {tab.name || 'Tab'}
              </div>
            </li>
          ) : (
            <li key={tab.key} className="mx-1 list-none">
              <div
                className="bg-white whitespace-no-wrap rounded-md cursor-pointer text-sm py-2 px-6 font-medium hover:bg-gray-200"
                onClick={() => setCurrentTab(tab.key)}
              >
                {tab.name || 'Tab'}
              </div>
            </li>
          ),
        )}
      </ul>

      <div
        className="flex ml-1 cursor-pointer select-none text-gray-600 hover:text-gray-800"
        onClick={() => scrollBy(100)}
      >
        <i className="material-icons">chevron_right</i>
      </div>
    </div>
  );
};

export default TabBar;
