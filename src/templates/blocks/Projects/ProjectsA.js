import dayjs from 'dayjs';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const ProjectItem = ({ item, i18n }) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="flex flex-col text-left mr-2">
        <h6 className="font-semibold">{item.title}</h6>
        {item.link && (
          <a href={item.link} className="text-xs">
            {item.link}
          </a>
        )}
      </div>
      {item.date && (
        <h6 className="text-xs font-medium text-right">
          {dayjs(item.date)
            .locale(i18n.language.substr(0, 2))
            .format('MMMM YYYY')}
        </h6>
      )}
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
    )}
  </div>
);

const ProjectsA = () => {
  const { i18n } = useTranslation();
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.projects) ? (
    <div>
      <Heading>{data.projects.heading}</Heading>
      <div className="grid gap-4">
        {data.projects.items.map((x) => (
          <ProjectItem key={x.id} item={x} i18n={i18n} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(ProjectsA);
