import React, { Fragment, memo } from 'react';
import { Element } from 'react-scroll';
import sections from '../../../data/leftSections';
import LeftNavbar from './LeftNavbar';
import styles from './LeftSidebar.module.css';
import Awards from './sections/Awards';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Hobbies from './sections/Hobbies';
import Languages from './sections/Languages';
import Objective from './sections/Objective';
import Profile from './sections/Profile';
import Projects from './sections/Projects';
import References from './sections/References';
import Skills from './sections/Skills';
import Social from './sections/Social';
import Work from './sections/Work';

const getComponent = (id) => {
  switch (id) {
    case 'profile':
      return Profile;
    case 'social':
      return Social;
    case 'objective':
      return Objective;
    case 'work':
      return Work;
    case 'education':
      return Education;
    case 'projects':
      return Projects;
    case 'awards':
      return Awards;
    case 'certifications':
      return Certifications;
    case 'skills':
      return Skills;
    case 'hobbies':
      return Hobbies;
    case 'languages':
      return Languages;
    case 'references':
      return References;
    default:
      throw new Error();
  }
};

const SidebarSection = ({ id, event }) => {
  const Component = getComponent(id);

  return (
    <Fragment key={id}>
      <Element name={id}>
        <Component id={id} event={event} />
      </Element>
      <hr />
    </Fragment>
  );
};

const LeftSidebar = () => {
  return (
    <div className="flex">
      <LeftNavbar />

      <div id="LeftSidebar" className={styles.container}>
        {sections.map(SidebarSection)}
      </div>
    </div>
  );
};

export default memo(LeftSidebar);
