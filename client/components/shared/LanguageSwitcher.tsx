import { Language } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

import { languages } from '@/config/languages';
import { setLanguage } from '@/store/build/buildSlice';
import { useAppDispatch } from '@/store/hooks';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleChangeLanguage = (locale: string) => {
    const { pathname, asPath, query } = router;

    dayjs.locale(locale);
    dispatch(setLanguage({ language: locale }));
    document.cookie = `NEXT_LOCALE=${locale}; path=/; expires=2147483647`;

    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Language />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className={styles.popover}>
          <div className={styles.container}>
            {languages.map(({ code, name, localName }) => (
              <p key={code} className={styles.language} onClick={() => handleChangeLanguage(code)}>
                {name} {localName && `(${localName})`}
              </p>
            ))}

            <a href="https://translate.rxresu.me" target="_blank" rel="noreferrer" className={styles.language}>
              Missing your language?
            </a>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSwitcher;
