import React from 'react';
import { Trans } from 'react-i18next';

const MarkdownHelpText = ({ className }) => {
  return (
    <div className={className}>
      <p className="text-gray-800 text-xs">
        <Trans i18nKey="markdownHelpText">
          You can use
          <a
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
          >
            GitHub Flavored Markdown
          </a>
          to style this section of text.
        </Trans>
      </p>
    </div>
  );
};

export default MarkdownHelpText;
