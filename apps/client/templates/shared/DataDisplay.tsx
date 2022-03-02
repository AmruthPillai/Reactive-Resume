import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';

type Props = {
  icon?: JSX.Element;
  link?: string;
  className?: string;
};

const DataDisplay: React.FC<Props> = ({ icon, link, className, children }) => {
  if (isEmpty(children)) return null;

  if (!isEmpty(link)) {
    return (
      <div className={clsx('inline-flex items-center gap-1', className)}>
        {icon}
        <a href={link} target="_blank" rel="noreferrer">
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={clsx('inline-flex items-center gap-1', className)}>
      {icon}
      <span>{children}</span>
    </div>
  );
};

export default DataDisplay;
