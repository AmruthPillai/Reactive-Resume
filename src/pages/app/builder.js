import { navigate } from 'gatsby';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import * as styles from './builder.module.css';
import { useDispatch } from '../../contexts/ResumeContext';
import Artboard from '../../components/builder/center/Artboard';
import Button from '../../components/shared/Button';
import DatabaseContext from '../../contexts/DatabaseContext';
import LeftSidebar from '../../components/builder/left/LeftSidebar';
import LoadingScreen from '../../components/router/LoadingScreen';
import RightSidebar from '../../components/builder/right/RightSidebar';
import SettingsContext from '../../contexts/SettingsContext';

const Builder = ({ id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);
  const { isSideBarOpen } = useContext(SettingsContext);

  const handleLoadDemoData = () => {
    dispatch({ type: 'load_demo_data' });
  };

  useEffect(() => {
    (async () => {
      const resume = await getResume(id);

      if (!resume) {
        navigate('/app/dashboard');
        toast.error(t('builder.toasts.doesNotExist'));
        return null;
      }

      if (resume.createdAt === resume.updatedAt) {
        toast.dark(() => (
          <div className="py-2">
            <p className="leading-loose">{t('builder.toasts.loadDemoData')}</p>

            <Button className="mt-4" onClick={handleLoadDemoData}>
              {t('builder.actions.loadDemoData.button')}
            </Button>
          </div>
        ));
      }

      dispatch({ type: 'set_data', payload: resume });
      return setLoading(false);
    })();
  }, [id]);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <LeftSidebar />
        </div>
        <div className={`${styles.center} ${!isSideBarOpen && 'flex-1'}`}>
          <Artboard />
        </div>
        <div className={styles.right}>
          <RightSidebar />
        </div>
      </div>
    );
  }, [loading, isSideBarOpen]);
};

export default memo(Builder);
