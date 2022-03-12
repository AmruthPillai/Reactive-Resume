import { AnnouncementOutlined } from '@mui/icons-material';
import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';

import { PRODUCT_HUNT_URL } from '@/constants/index';

import styles from './Announcement.module.scss';

const Announcement = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.container}>
      <Collapse in={open}>
        <Alert icon={<AnnouncementOutlined />} severity="info" onClose={() => setOpen(false)}>
          <a href={PRODUCT_HUNT_URL} target="_blank" rel="noreferrer">
            <strong>Reactive Resume is featured on Product Hunt.</strong> If you liked this app, please show your
            support by <strong>upvoting</strong>!
          </a>
        </Alert>
      </Collapse>
    </div>
  );
};

export default Announcement;
