import { css } from '@emotion/css';
import { CustomCSS, Theme, Typography } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import templateMap from '@/templates/templateMap';
import { generateThemeStyles, generateTypographyStyles } from '@/utils/styles';
import { PageProps } from '@/utils/template';

import styles from './Page.module.scss';

type Props = PageProps & {
  showPageNumbers?: boolean;
};

const Page: React.FC<Props> = ({ page, showPageNumbers = false }) => {
  const { t } = useTranslation();

  const resume = useAppSelector((state) => state.resume);
  const breakLine: boolean = useAppSelector((state) => state.build.page.breakLine);

  const theme: Theme = get(resume, 'metadata.theme');
  const customCSS: CustomCSS = get(resume, 'metadata.css');
  const template: string = get(resume, 'metadata.template');
  const typography: Typography = get(resume, 'metadata.typography');

  const themeCSS = useMemo(() => !isEmpty(theme) && generateThemeStyles(theme), [theme]);
  const typographyCSS = useMemo(() => !isEmpty(typography) && generateTypographyStyles(typography), [typography]);
  const TemplatePage: React.FC<PageProps> | null = useMemo(() => templateMap[template].component, [template]);

  return (
    <div data-page={page + 1} className={styles.container}>
      <div
        className={clsx({
          reset: true,
          [styles.page]: true,
          [styles.break]: breakLine,
          [css(themeCSS)]: true,
          [css(typographyCSS)]: true,
          [css(customCSS.value)]: customCSS.visible,
        })}
      >
        {TemplatePage && <TemplatePage page={page} />}
      </div>

      {showPageNumbers && (
        <h4 className={styles.pageNumber}>{`${t<string>('builder.common.glossary.page')} ${page + 1}`}</h4>
      )}
    </div>
  );
};

export default Page;
