import React, { memo, useContext, useState } from 'react';
import UserContext from '../../../../contexts/UserContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './Settings.module.css';
import Input from '../../../shared/Input';
import ThemeContext from '../../../../contexts/ThemeContext';
import themeConfig from '../../../../data/themeConfig';

const Settings = () => {
  const [deleteText, setDeleteText] = useState('Delete Account');
  const { deleteAccount } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const handleDeleteAccount = () => {
    if (deleteText === 'Delete Account') {
      setDeleteText('Are you sure?');
      return;
    }

    setDeleteText('Buh bye! :(');
    setTimeout(() => {
      deleteAccount();
    }, 500);
  };

  return (
    <section>
      <Heading>Settings</Heading>

      <Input
        label="Theme"
        type="dropdown"
        options={Object.keys(themeConfig)}
        value={theme}
        onChange={handleChangeTheme}
      />

      <div className={styles.container}>
        <h5>Danger Zone</h5>

        <p className="leading-loose">
          If you would like to delete your account and erase all your resumes,
          it’s just one button away. Please be weary as this is an irreversible
          process.
        </p>

        <div className="mt-4 flex">
          <Button isDelete onClick={handleDeleteAccount}>
            {deleteText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Settings);
