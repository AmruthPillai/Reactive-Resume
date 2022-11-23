import clsx from 'clsx';
import { isEmpty } from 'lodash';
import ReactMarkdown from 'react-markdown';

type Props = {
  children?: string;
  className?: string;
};

const Markdown: React.FC<Props> = ({ className, children }) => {
  if (!children || isEmpty(children)) return null;

  return (
    <ReactMarkdown remarkPlugins={[]} className={clsx('markdown', className)}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
