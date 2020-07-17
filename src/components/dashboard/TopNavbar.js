import { Link } from 'gatsby';
import React, { memo } from 'react';
import Avatar from '../shared/Avatar';
import Logo from '../shared/Logo';
import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <Link to="/">
          <Logo size="40px" />
        </Link>

        <Avatar className="ml-8" />
      </div>
    </div>
  );
};

export default memo(TopNavbar);
