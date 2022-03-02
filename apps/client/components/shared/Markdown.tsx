import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  children?: string;
  className?: string;
};

const Markdown: React.FC<Props> = ({ className, children }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx('markdown', className)}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
