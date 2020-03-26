import React from 'react';

const MarkdownHelpText = ({ className }) => {
  return (
    <div className={className}>
      <p className="text-gray-800 text-xs">
        You can use{' '}
        <a
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
        >
          GitHub Flavored Markdown
        </a>{' '}
        to style this section of text.
      </p>
    </div>
  );
};

export default MarkdownHelpText;
