import { Divider, IconButton, SwipeableDrawer, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import capitalize from 'lodash/capitalize';
import { useTranslation } from 'next-i18next';

import Avatar from '@/components/shared/Avatar';
import Footer from '@/components/shared/Footer';
import { right } from '@/config/sections';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './RightSidebar.module.scss';

const RightSidebar = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const { open } = useAppSelector((state) => state.build.sidebar.right);

  const handleOpen = () => dispatch(setSidebarState({ sidebar: 'right', state: { open: true } }));

  const handleClose = () => dispatch(setSidebarState({ sidebar: 'right', state: { open: false } }));

  const handleClick = (id: string) => {
    const section = document.querySelector(`#${id}`);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SwipeableDrawer
      open={open}
      anchor="right"
      onOpen={handleOpen}
      onClose={handleClose}
      PaperProps={{ className: '!shadow-lg' }}
      variant={isDesktop ? 'persistent' : 'temporary'}
    >
      <div className={styles.container}>
        <nav className="overflow-y-auto">
          <div>
            <Avatar size={24} />
            <Divider />
          </div>

          <div className={styles.sections}>
            {right.map(({ id, icon }) => (
              <Tooltip
                key={id}
                arrow
                placement="right"
                title={t(`builder.rightSidebar.sections.${id}.heading`, { defaultValue: capitalize(id) })}
              >
                <IconButton onClick={() => handleClick(id)}>{icon}</IconButton>
              </Tooltip>
            ))}
          </div>

          <div />
        </nav>

        <main>
          {right.map(({ id, component }) => (
            <section key={id} id={id}>
              {component}
            </section>
          ))}

          <footer className={styles.footer}>
            <Footer />

            <div>v{process.env.appVersion}</div>
          </footer>
        </main>
      </div>
    </SwipeableDrawer>
  );
};

export default RightSidebar;
