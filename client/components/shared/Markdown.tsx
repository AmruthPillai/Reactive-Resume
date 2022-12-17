import clsx from 'clsx';
import { isEmpty } from 'lodash';
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
      className={clsx('markdown', className)}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
