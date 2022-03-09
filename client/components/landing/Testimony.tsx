import { Testimony } from '@/data/testimonials';

import styles from './Testimony.module.scss';

type Props = Testimony;

const Testimony: React.FC<Props> = ({ name, message }) => {
  return (
    <div className={styles.testimony}>
      <blockquote>{message}</blockquote>

      <figcaption>— {name}</figcaption>
    </div>
  );
};

export default Testimony;
