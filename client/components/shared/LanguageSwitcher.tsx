import { Language } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MouseEvent, useState } from 'react';

import { languages } from '@/config/languages';

import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleChangeLanguage = (locale: string) => {
    const { pathname, asPath, query } = router;

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
              {t('common.footer.language.missing')}
            </a>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSwitcher;
