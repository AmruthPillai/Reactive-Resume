import React, { useState, useContext } from 'react';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import ProfileTab from './tabs/Profile';
import ContactTab from './tabs/Contact';
import ObjectiveTab from './tabs/Objective';
import WorkTab from './tabs/Work';
import EducationTab from './tabs/Education';
import AwardsTab from './tabs/Awards';
import CertificationsTab from './tabs/Certifications';
import SkillsTab from './tabs/Skills';
import ExtrasTab from './tabs/Extras';
import LanguagesTab from './tabs/Languages';
import ReferencesTab from './tabs/References';
import HobbiesTab from './tabs/Hobbies';

const LeftSidebar = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data } = state;

  const tabs = [
    { key: 'profile', name: data.profile.heading },
    { key: 'contact', name: data.contact.heading },
    { key: 'objective', name: data.objective.heading },
    { key: 'work', name: data.work.heading },
    { key: 'education', name: data.education.heading },
    { key: 'awards', name: data.awards.heading },
    { key: 'certifications', name: data.certifications.heading },
    { key: 'skills', name: data.skills.heading },
    { key: 'hobbies', name: data.hobbies.heading },
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
      case 'profile':
        return <ProfileTab data={data} onChange={onChange} />;
      case 'contact':
        return <ContactTab data={data} onChange={onChange} />;
      case 'objective':
        return <ObjectiveTab data={data} onChange={onChange} />;
      case 'work':
        return <WorkTab data={data} onChange={onChange} />;
      case 'education':
        return <EducationTab data={data} onChange={onChange} />;
      case 'awards':
        return <AwardsTab data={data} onChange={onChange} />;
      case 'certifications':
        return <CertificationsTab data={data} onChange={onChange} />;
      case 'skills':
        return <SkillsTab data={data} onChange={onChange} />;
      case 'hobbies':
        return <HobbiesTab data={data} onChange={onChange} />;
      case 'languages':
        return <LanguagesTab data={data} onChange={onChange} />;
      case 'references':
        return <ReferencesTab data={data} onChange={onChange} />;
      case 'extras':
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
