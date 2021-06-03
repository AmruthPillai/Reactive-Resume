import { Element } from 'react-scroll';
import React, { Fragment, memo } from 'react';
import * as styles from './RightSidebar.module.css';
import About from './sections/About';
import Actions from './sections/Actions';
import Colors from './sections/Colors';
import FontSize from './sections/FontSize';
import Fonts from './sections/Fonts';
import Layout from './sections/Layout';
import RightNavbar from './RightNavbar';
import Settings from './sections/Settings';
import Templates from './sections/Templates';
import sections from '../../../data/rightSections';

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
    case 'font-size':
      return FontSize;
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

const RightSidebar = () => (
  <div className="flex">
    <div id="RightSidebar" className={styles.container}>
      {sections.map(SidebarSection)}
    </div>

    <RightNavbar />
  </div>
);

export default memo(RightSidebar);
