import React, { useState, useContext } from 'react';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import TemplatesTab from './tabs/Templates';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';

const tabs = ['Templates', 'Colors', 'Fonts', 'Actions'];

const RightSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data, theme } = state;

  const [currentTab, setCurrentTab] = useState('Templates');
  const onChange = (key, value) => {
    dispatch({
      type: 'on_input',
      payload: {
        key,
        value,
      },
    });

    dispatch({ type: 'save_data' });
  };

  const renderTabs = () => {
    switch (currentTab) {
      case 'Templates':
        return <TemplatesTab theme={theme} onChange={onChange} />;
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
      className="animated slideInRight z-10 py-6 h-screen bg-white col-span-1 shadow-2xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="px-6">{renderTabs()}</div>
    </div>
  );
};

export default RightSidebar;
