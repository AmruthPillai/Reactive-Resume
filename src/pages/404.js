import { memo, useEffect } from 'react';
import { navigate } from 'gatsby';

const NotFound = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return null;
};

export default memo(NotFound);
