import { useRouter } from 'next/router';
import { useIsFetching, useIsMutating } from 'react-query';

import styles from './Loading.module.scss';

const Loading: React.FC = () => {
  const { isReady } = useRouter();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating && isReady) {
    return null;
  }

  return <div className={styles.loading} />;
};

export default Loading;
