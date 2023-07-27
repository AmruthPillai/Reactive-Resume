import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

type Props = {
  children?: string;
  className?: string;
};

const Markdown: React.FC<Props> = ({ className, children }) => {
  if (!children || isEmpty(children)) return null;

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeKatex]}
      className={clsx('markdown', className)}
      remarkPlugins={[remarkGfm, remarkMath]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
