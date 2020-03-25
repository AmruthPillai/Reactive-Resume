import React, { useState, useContext } from 'react';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import LayoutTab from './tabs/Layout';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';

const tabs = ['Layout', 'Colors', 'Fonts', 'Actions'];

const RightSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data, theme } = state;

  const [currentTab, setCurrentTab] = useState('Actions');
  const onChange = (key, value) =>
    dispatch({
      type: 'on_input',
      payload: {
        key,
        value,
      },
    });

  const renderTabs = () => {
    switch (currentTab) {
      case 'Layout':
        return <LayoutTab theme={theme} />;
      case 'Colors':
        return <ColorsTab theme={theme} onChange={onChange} />;
      case 'Fonts':
        return <FontsTab theme={theme} onChange={onChange} />;
      case 'Actions':
        return <ActionsTab data={data} theme={theme} dispatch={dispatch} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="rightSidebar"
      className="z-10 py-6 h-screen bg-white col-span-1 shadow-2xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="px-6">{renderTabs()}</div>
    </div>
  );
};

export default RightSidebar;
