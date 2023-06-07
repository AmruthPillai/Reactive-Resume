import { Email, Link, Phone } from '@mui/icons-material';
import { ListItem, Section as SectionType } from 'schema';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import { SectionProps } from '@/templates/sectionMap';
import DataDisplay from '@/templates/shared/DataDisplay';
import { formatDateString } from '@/utils/date';
import { parseListItemPath } from '@/utils/template';

import BadgeDisplay from './BadgeDisplay';
import Heading from './Heading';

const Section: React.FC<SectionProps> = ({
  path,
  titlePath = 'title',
  subtitlePath = 'subtitle',
  headlinePath = 'headline',
  keywordsPath = 'keywords',
}) => {
  const section: SectionType = useAppSelector((state) => get(state.resume.present, path, {} as SectionType));
  const dateFormat: string = useAppSelector((state) => get(state.resume.present, 'metadata.date.format'));
  const primaryColor: string = useAppSelector((state) => get(state.resume.present, 'metadata.theme.primary'));

  const sectionId = useMemo(() => section.id || path.replace('sections.', ''), [path, section]);

  if (!section.visible) return null;

  if (isArray(section.items) && isEmpty(section.items)) return null;

  return (
    <section id={`Kakuna_${sectionId}`}>
      <Heading>{section.name}</Heading>

      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: `repeat(${section.columns}, minmax(0, 1fr))` }}
      >
        {section.items.map((item: ListItem) => {
          const id = item.id,
            title = parseListItemPath(item, titlePath),
            subtitle = parseListItemPath(item, subtitlePath),
            headline = parseListItemPath(item, headlinePath),
            keywords: string[] = get(item, keywordsPath),
            url: string = get(item, 'url', ''),
            level: string = get(item, 'level', ''),
            phone: string = get(item, 'phone', ''),
            email: string = get(item, 'email', ''),
            summary: string = get(item, 'summary', ''),
            levelNum: number = get(item, 'levelNum', 0),
            date = formatDateString(get(item, 'date', ''), dateFormat);

          return (
            <div key={id} id={id} className="grid gap-1">
              {title && <span className="font-bold">{title}</span>}

              {subtitle && <span className="opacity-75">{subtitle}</span>}

              {headline && <span className="opacity-75">{headline}</span>}

              {(level || levelNum > 0) && (
                <div className="grid gap-1">
                  {level && <span className="opacity-75">{level}</span>}
                  {levelNum > 0 && (
                    <div className="flex justify-center">
                      {Array.from(Array(5).keys()).map((_, index) => (
                        <div
                          key={index}
                          className="mr-1 h-3 w-4 rounded border-2"
                          style={{
                            borderColor: primaryColor,
                            backgroundColor: levelNum / (10 / 5) > index ? primaryColor : '',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {date && <div className="opacity-50">({date})</div>}

              {summary && <Markdown>{summary}</Markdown>}

              {url && (
                <div className="inline-flex justify-center">
                  <DataDisplay link={url} icon={<Link />}>
                    {url}
                  </DataDisplay>
                </div>
              )}

              {keywords && <BadgeDisplay items={keywords} />}

              {(phone || email) && (
                <div className="grid gap-1">
                  {phone && (
                    <div className="inline-flex items-center justify-center gap-x-2">
                      <Phone />
                      <span>{phone}</span>
                    </div>
                  )}

                  {email && (
                    <div className="inline-flex items-center justify-center gap-x-2">
                      <Email />
                      <span>{email}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Section;
