import { navigate } from 'gatsby';
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Artboard from '../../components/builder/center/Artboard';
import LeftSidebar from '../../components/builder/left/LeftSidebar';
import RightSidebar from '../../components/builder/right/RightSidebar';
import LoadingScreen from '../../components/router/LoadingScreen';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useDispatch } from '../../contexts/ResumeContext';
import Button from '../../components/shared/Button';

const Builder = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { getResume } = useContext(DatabaseContext);

  const handleLoadDemoData = () => {
    dispatch({ type: 'load_demo_data' });
  };

  useEffect(() => {
    (async () => {
      const resume = await getResume(id);

      if (!resume) {
        navigate('/app/dashboard');
        toast.error(
          `The resume you were looking for does not exist anymore... or maybe it never did?`,
        );
        return null;
      }

      if (resume.createdAt === resume.updatedAt) {
        toast.dark(() => (
          <div className="py-2">
            <p className="leading-loose">
              Not sure where to begin? Try <strong>Loading Demo Data</strong> to
              see what Reactive Resume has to offer.
            </p>

            <Button className="mt-4" onClick={handleLoadDemoData}>
              Load Demo Data
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
      <div className="h-screen grid grid-cols-11">
        <div className="col-span-3">
          <LeftSidebar />
        </div>
        <div className="h-screen overflow-scroll col-span-5 bg-primary-100 grid items-center justify-center">
          <Artboard />
        </div>
        <div className="col-span-3">
          <RightSidebar />
        </div>
      </div>
    );
  }, [loading]);
};

export default memo(Builder);
