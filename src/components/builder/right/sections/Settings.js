import React, { memo, useContext, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';
import UserContext from '../../../../contexts/UserContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './Settings.module.css';
import Input from '../../../shared/Input';
import SettingsContext from '../../../../contexts/SettingsContext';
import themeConfig from '../../../../data/themeConfig';
import { languages } from '../../../../i18n';
import { useDispatch } from '../../../../contexts/ResumeContext';

const Settings = ({ id }) => {
  const { t } = useTranslation();

  const [deleteText, setDeleteText] = useState(
    t('builder.settings.dangerZone.button'),
  );

  const dispatch = useDispatch();
  const { deleteAccount } = useContext(UserContext);
  const { theme, setTheme, language, setLanguage } = useContext(
    SettingsContext,
  );

  const handleChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    dispatch({ type: 'change_language', payload: lang });
  };

  const handleDeleteAccount = () => {
    if (deleteText === t('builder.settings.dangerZone.button')) {
      setDeleteText(t('shared.buttons.confirmation'));
      return;
    }

    setDeleteText('Buh bye! :(');
    setTimeout(() => {
      deleteAccount();
    }, 500);
  };

  return (
    <section>
      <Heading id={id} />

      <Input
        label={t('builder.settings.theme')}
        type="dropdown"
        options={Object.keys(themeConfig)}
        value={theme}
        onChange={handleChangeTheme}
      />

      <label>
        <span>{t('builder.settings.language')}</span>
        <div className="relative grid items-center">
          <select onChange={handleChangeLanguage} value={language}>
            {languages.map((x) => (
              <option key={x.code} value={x.code}>
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
        <Trans t={t} i18nKey="builder.settings.translate">
          A
          <a
            href="https://github.com/AmruthPillai/Reactive-Resume#translation"
            rel="noreferrer"
            target="_blank"
          >
            B
          </a>
          C
        </Trans>
      </p>

      <div className={styles.container}>
        <h5>{t('builder.settings.dangerZone.heading')}</h5>

        <p className="leading-loose">{t('builder.settings.dangerZone.text')}</p>

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
