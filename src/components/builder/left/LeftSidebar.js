import React from 'react';
import { Element } from 'react-scroll';
import sections from '../../../data/leftSections';
import LeftNavbar from './LeftNavbar';
import styles from './LeftSidebar.module.css';

const LeftSidebar = () => (
  <div className="flex">
    <LeftNavbar />

    <div id="LeftSidebar" className={styles.container}>
      {sections.map(({ id, name, event, component: Component }) => (
        <Element key={id} name={id}>
          <Component id={id} name={name} event={event} />
          <hr />
        </Element>
      ))}
    </div>
  </div>
);

export default LeftSidebar;
