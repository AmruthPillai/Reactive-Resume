import { Email, Phone } from '@mui/icons-material';
import { ListItem, Section } from '@reactive-resume/schema';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

import Markdown from '@/components/shared/Markdown';
import { useAppSelector } from '@/store/hooks';
import { SectionProps } from '@/templates/sectionMap';
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
  const section: Section = useAppSelector((state) => get(state.resume, path, {}));
  const dateFormat: string = useAppSelector((state) => get(state.resume, 'metadata.date.format'));
  const primaryColor: string = useAppSelector((state) => get(state.resume, 'metadata.theme.primary'));

  if (!section.visible) return null;

  if (isArray(section.items) && isEmpty(section.items)) return null;

  return (
    <section>
      <Heading>{section.name}</Heading>

      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: `repeat(${section.columns}, minmax(0, 1fr))` }}
      >
        {section.items.map((item: ListItem) => {
          const id = item.id,
            title: string = parseListItemPath(item, titlePath),
            subtitle: string = parseListItemPath(item, subtitlePath),
            headline: string = parseListItemPath(item, headlinePath),
            keywords: string[] = get(item, keywordsPath),
            url: string = get(item, 'url'),
            summary: string = get(item, 'summary'),
            level: string = get(item, 'level'),
            levelNum: number = get(item, 'levelNum'),
            phone: string = get(item, 'phone'),
            email: string = get(item, 'email'),
            date: string = formatDateString(get(item, 'date'), dateFormat);

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
                      {[...Array(5).keys()].map((_, index) => (
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
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
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
