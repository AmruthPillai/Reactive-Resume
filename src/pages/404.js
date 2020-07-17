import { navigate } from 'gatsby';
import { memo, useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return null;
};

export default memo(NotFound);
