import moment from 'moment/min/moment-with-locales';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const ProjectItem = (x) => {
  const { i18n } = useTranslation();

  return (
    <div key={x.id}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold">{x.title}</h6>
          {x.link && (
            <a href={x.link} className="text-xs">
              {x.link}
            </a>
          )}
        </div>
        {x.date && (
          <h6 className="text-xs font-medium text-right">
            {moment(x.date)
              .locale(i18n.language.substr(0, 2))
              .format('MMMM YYYY')}
          </h6>
        )}
      </div>
      {x.summary && (
        <ReactMarkdown className="markdown mt-2 text-sm" source={x.summary} />
      )}
    </div>
  );
};

const ProjectsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.projects) ? (
    <div>
      <Heading>{data.projects.heading}</Heading>
      <div className="grid gap-4">{data.projects.items.map(ProjectItem)}</div>
    </div>
  ) : null;
};

export default memo(ProjectsA);
