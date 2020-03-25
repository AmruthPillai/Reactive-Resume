import React, { useRef } from 'react';

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {
  const tabsRef = useRef(null);

  const scrollBy = x => {
    const index = tabs.indexOf(currentTab);
    tabsRef.current.scrollLeft += x;

    if (x < 0 && index > 0) {
      setCurrentTab(tabs[index - 1]);
    }

    if (x > 0 && index < tabs.length - 1) {
      setCurrentTab(tabs[index + 1]);
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
