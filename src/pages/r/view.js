import { navigate, Link } from '@reach/router';
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/router/LoadingScreen';
import DatabaseContext from '../../contexts/DatabaseContext';
import Onyx from '../../templates/Onyx';
import styles from './view.module.css';

const ResumeViewer = ({ id }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);

  useEffect(() => {
    (async () => {
      const data = await getResume(id);

      if (!data) {
        navigate('/');
        toast.error(
          `The resume you were looking for does not exist anymore... or maybe it never did?`,
        );
        return null;
      }

      setResume(data);
      return setLoading(false);
    })();
  }, [id]);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div className={styles.container}>
        <Helmet>
          <title>{resume.name} | Reactive Resume</title>
          <link rel="canonical" href={`https://rxresu.me/r/${id}`} />
        </Helmet>
        <div
          className={styles.page}
          style={{ backgroundColor: resume.metadata.colors.background }}
        >
          {resume.metadata.template === 'onyx' && <Onyx data={resume} />}
        </div>

        <p className={styles.footer}>
          Built with <Link to="/">Reactive Resume</Link>
        </p>
      </div>
    );
  });
};

export default memo(ResumeViewer);
