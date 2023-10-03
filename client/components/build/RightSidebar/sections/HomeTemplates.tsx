import { ButtonBase } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { useAppDispatch } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';
import templateMap, { TemplateMeta } from '@/templates/templateMap';

import styles from './HomeTemplates.module.scss';

const HomeTemplates = ({ currentTemplate, setTemplate, creds }: any) => {
  const { t } = useTranslation();

  // const [currentTemplate, setTemplate] = useState(templateId);

  const dispatch = useAppDispatch();

  // const currentTemplate: string = useAppSelector((state) => get(state.resume.present, 'metadata.template'));

  const handleChange = (template: TemplateMeta) => {
    setTemplate(template.id);
    if (creds !== undefined && creds !== null && creds.slug !== undefined && creds.slug !== null) {
      dispatch(setResumeState({ path: creds.slug, value: creds.slug }));
      return;
    }
    dispatch(setResumeState({ path: 'metadata.template', value: template.id }));
  };

  return (
    <div>
      <h3>
        Currently You have selected <b>{currentTemplate}</b>{' '}
      </h3>

      <br />

      <div className={styles.container}>
        {Object.values(templateMap).map((template) => (
          <div key={template.id} className={styles.template}>
            <div className={clsx(styles.preview, { [styles.selected]: template.id === currentTemplate })}>
              <ButtonBase onClick={() => handleChange(template)}>
                <Image
                  fill
                  priority
                  alt={template.name}
                  src={template.preview}
                  className="rounded-sm"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </ButtonBase>
            </div>

            <p className={styles.label}>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTemplates;
