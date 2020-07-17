import React, { Fragment, memo } from 'react';
import { Element } from 'react-scroll';
import sections from '../../../data/rightSections';
import RightNavbar from './RightNavbar';
import styles from './RightSidebar.module.css';
import About from './sections/About';
import Actions from './sections/Actions';
import Colors from './sections/Colors';
import Fonts from './sections/Fonts';
import Layout from './sections/Layout';
import Settings from './sections/Settings';
import Templates from './sections/Templates';

const getComponent = (id) => {
  switch (id) {
    case 'templates':
      return Templates;
    case 'layout':
      return Layout;
    case 'colors':
      return Colors;
    case 'fonts':
      return Fonts;
    case 'actions':
      return Actions;
    case 'settings':
      return Settings;
    case 'about':
      return About;
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

const RightSidebar = () => {
  return (
    <div className="flex">
      <div id="RightSidebar" className={styles.container}>
        {sections.map(SidebarSection)}
      </div>

      <RightNavbar />
    </div>
  );
};

export default memo(RightSidebar);
