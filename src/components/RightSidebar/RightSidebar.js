import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import TemplatesTab from './tabs/Templates';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';
import AboutTab from './tabs/About';

const RightSidebar = () => {
  const { t } = useTranslation('rightSidebar');

  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data, theme } = state;

  const tabs = [t('templates.title'), t('colors.title'), 'Fonts', 'Actions', 'About'];
  const [currentTab, setCurrentTab] = useState(t('colors.title'));
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
      case t('templates.title'):
        return <TemplatesTab theme={theme} onChange={onChange} />;
      case t('colors.title'):
        return <ColorsTab theme={theme} onChange={onChange} />;
      case 'Fonts':
        return <FontsTab theme={theme} onChange={onChange} />;
      case 'Actions':
        return <ActionsTab data={data} theme={theme} dispatch={dispatch} />;
      case 'About':
        return <AboutTab />;
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
