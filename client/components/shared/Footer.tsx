import clsx from 'clsx';
import { Trans, useTranslation } from 'next-i18next';

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('text-xs', className)}>
      <p>{t('common.footer.license')}</p>

      <p>
        <Trans t={t} i18nKey="common.footer.credit">
          A passion project by
          <a href="https://www.amruthpillai.com/" target="_blank" rel="noreferrer">
            Amruth Pillai
          </a>
        </Trans>
      </p>
    </div>
  );
};

export default Footer;
