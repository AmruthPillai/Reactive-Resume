import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import cx from 'classnames';

const Markdown = ({ children, className, ...props }) => (
  <ReactMarkdown
    className={cx('markdown', className)}
    remarkPlugins={[gfm]}
    {...props}
  >
    {children}
  </ReactMarkdown>
);

export default memo(Markdown);
