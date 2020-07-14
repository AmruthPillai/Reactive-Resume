import React, { memo, useContext, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import UserContext from '../../../../contexts/UserContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './Settings.module.css';
import Input from '../../../shared/Input';
import ThemeContext from '../../../../contexts/ThemeContext';
import themeConfig from '../../../../data/themeConfig';
import languageConfig from '../../../../data/languageConfig';

const Settings = () => {
  const [deleteText, setDeleteText] = useState('Delete Account');
  const { deleteAccount } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    console.log(e.target.value);
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

      <label>
        <span>Language</span>
        <div className="relative grid items-center">
          <select onChange={handleChangeLanguage}>
            {languageConfig.map((x) => (
              <option key={x.key} value={x.key}>
                {x.name}
              </option>
            ))}
          </select>

          <FaAngleDown
            size="16px"
            className="absolute right-0 opacity-50 hover:opacity-75 mx-4"
          />
        </div>
      </label>

      <p className="text-sm leading-loose">
        If you would like to contribute by providing translations to Reactive
        Resume in your language,{' '}
        <a
          href="https://github.com/AmruthPillai/Reactive-Resume/blob/master/TRANSLATING.md"
          rel="noreferrer"
          target="_blank"
        >
          please visit this link
        </a>
        .
      </p>

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
