import { Testimony as TestimonyType } from '@/data/testimonials';

import styles from './Testimony.module.scss';

type Props = TestimonyType;

const Testimony: React.FC<Props> = ({ name, message }) => {
  return (
    <div className={styles.testimony}>
      <blockquote>{message}</blockquote>

      <figcaption>— {name}</figcaption>
    </div>
  );
};

export default Testimony;
