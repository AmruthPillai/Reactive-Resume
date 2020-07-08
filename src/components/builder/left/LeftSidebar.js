import React, { Fragment } from 'react';
import sections from '../../../data/leftSections';
import LeftNavbar from './LeftNavbar';
import styles from './LeftSidebar.module.css';

const LeftSidebar = () => (
  <div className="flex">
    <LeftNavbar />

    <div className={styles.container}>
      {sections.map(({ id, name, event, component: Component }) => (
        <Fragment key={id}>
          <Component id={id} name={name} event={event} />
          <hr />
        </Fragment>
      ))}
    </div>
  </div>
);

export default LeftSidebar;
