import { ButtonBase } from '@mui/material';
import clsx from 'clsx';
import get from 'lodash/get';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Heading from '@/components/shared/Heading';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';
import templateMap, { TemplateMeta } from '@/templates/templateMap';

import styles from './Templates.module.scss';

const Templates = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const currentTemplate: string = useAppSelector((state) => get(state.resume.present, 'metadata.template'));

  const handleChange = (template: TemplateMeta) => {
    dispatch(setResumeState({ path: 'metadata.template', value: template.id }));
  };

  return (
    <>
      <Heading path="metadata.templates" name={t('builder.rightSidebar.sections.templates.heading')} />

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
    </>
  );
};

export default Templates;
