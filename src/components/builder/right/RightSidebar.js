import React, { Fragment, memo } from 'react';
import { Element } from 'react-scroll';
import sections from '../../../data/rightSections';
import RightNavbar from './RightNavbar';
import styles from './RightSidebar.module.css';
import Layout from './sections/Layout';
import Templates from './sections/Templates';

const getComponent = (id) => {
  switch (id) {
    case 'templates':
      return Templates;
    case 'layout':
      return Layout;
    default:
      throw new Error();
  }
};

const RightSidebar = () => {
  return (
    <div className="flex">
      <div id="RightSidebar" className={styles.container}>
        {sections.map(({ id, name, event }) => {
          const Component = getComponent(id);

          return (
            <Fragment key={id}>
              <Element name={id}>
                <Component id={id} name={name} event={event} />
              </Element>
              <hr />
            </Fragment>
          );
        })}
      </div>

      <RightNavbar />
    </div>
  );
};

export default memo(RightSidebar);
