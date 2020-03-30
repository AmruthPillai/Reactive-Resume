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
import LanguagesTab from './tabs/Languages';
import ReferencesTab from './tabs/References';

const LeftSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data } = state;

  const tabs = [
    { key: 'profile', name: data.profile.heading },
    { key: 'objective', name: data.objective.heading },
    { key: 'work', name: data.work.heading },
    { key: 'education', name: data.education.heading },
    { key: 'awards', name: data.awards.heading },
    { key: 'certifications', name: data.certifications.heading },
    { key: 'skills', name: data.skills.heading },
    { key: 'languages', name: data.languages.heading },
    { key: 'references', name: data.references.heading },
    { key: 'extras', name: data.extras.heading },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
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
      case tabs[0].key:
        return <ProfileTab data={data} onChange={onChange} />;
      case tabs[1].key:
        return <ObjectiveTab data={data} onChange={onChange} />;
      case tabs[2].key:
        return <WorkTab data={data} onChange={onChange} />;
      case tabs[3].key:
        return <EducationTab data={data} onChange={onChange} />;
      case tabs[4].key:
        return <AwardsTab data={data} onChange={onChange} />;
      case tabs[5].key:
        return <CertificationsTab data={data} onChange={onChange} />;
      case tabs[6].key:
        return <SkillsTab data={data} onChange={onChange} />;
      case tabs[7].key:
        return <LanguagesTab data={data} onChange={onChange} />;
      case tabs[8].key:
        return <ReferencesTab data={data} onChange={onChange} />;
      case tabs[9].key:
        return <ExtrasTab data={data} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="leftSidebar"
      className="animated slideInLeft z-10 py-6 h-screen bg-white col-span-1 shadow-2xl overflow-y-scroll"
    >
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="px-6">{renderTabs()}</div>
    </div>
  );
};

export default LeftSidebar;
