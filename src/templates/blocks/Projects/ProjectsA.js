import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDate, safetyCheck } from '../../../utils';

const ProjectItem = ({ item, language }) => (
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
          {formatDate({ date: item.date, language })}
        </h6>
      )}
    </div>
    {item.summary && (
      <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
    )}
  </div>
);

const ProjectsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.projects) ? (
    <div>
      <Heading>{data.projects.heading}</Heading>
      <div className="grid gap-4">
        {data.projects.items.map((x) => (
          <ProjectItem key={x.id} item={x} language={data.metadata.language} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(ProjectsA);
