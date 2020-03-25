import React, { useState, useContext } from 'react';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import ProfileTab from './tabs/Profile';
import ObjectiveTab from './tabs/Objective';
import WorkTab from './tabs/Work';
import EducationTab from './tabs/Education';
import AwardsTab from './tabs/Awards';
import CertificationsTab from './tabs/Certifications';
import SkillsTab from './tabs/Skills';
import ExtrasTab from './tabs/Extras';

const tabs = [
  'Profile',
  'Objective',
  'Work Experience',
  'Education',
  'Awards',
  'Certifications',
  'Skills',
  'Extras',
];

const LeftSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data } = state;

  const [currentTab, setCurrentTab] = useState('Profile');
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
      case 'Profile':
        return <ProfileTab data={data} onChange={onChange} />;
      case 'Objective':
        return <ObjectiveTab data={data} onChange={onChange} />;
      case 'Work Experience':
        return <WorkTab data={data} onChange={onChange} />;
      case 'Education':
        return <EducationTab data={data} onChange={onChange} />;
      case 'Awards':
        return <AwardsTab data={data} onChange={onChange} />;
      case 'Certifications':
        return <CertificationsTab data={data} onChange={onChange} />;
      case 'Skills':
        return <SkillsTab data={data} onChange={onChange} />;
      case 'Extras':
        return <ExtrasTab data={data} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="leftSidebar"
      className="z-10 py-6 h-screen bg-white col-span-1 shadow-2xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="px-6">{renderTabs()}</div>
    </div>
  );
};

export default LeftSidebar;
