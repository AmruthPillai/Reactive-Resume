import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';

import { addHttp } from '@/utils/template';

type Props = {
  icon?: JSX.Element;
  link?: string;
  className?: string;
  textClassName?: string;
};

const DataDisplay: React.FC<React.PropsWithChildren<Props>> = ({ icon, link, className, textClassName, children }) => {
  if (isEmpty(children)) return null;

  if (link && !isEmpty(link)) {
    return (
      <div className={clsx('inline-flex items-center gap-1', className)}>
        {icon}
        <a target="_blank" rel="noreferrer" href={addHttp(link)} className={textClassName}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={clsx('inline-flex items-center gap-1', className)}>
      {icon}
      <span className={textClassName}>{children}</span>
    </div>
  );
};

export default DataDisplay;
