import { useTranslation } from 'next-i18next';

import Heading from '@/components/shared/Heading';
import ResumeInput from '@/components/shared/ResumeInput';

const Location = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading path="sections.location" name={t('builder.leftSidebar.sections.location.heading')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResumeInput
          label={t('builder.leftSidebar.sections.location.address.label')}
          path="basics.location.address"
          className="sm:col-span-2"
        />
        <ResumeInput label={t('builder.leftSidebar.sections.location.city.label')} path="basics.location.city" />
        <ResumeInput label={t('builder.leftSidebar.sections.location.region.label')} path="basics.location.region" />
        <ResumeInput label={t('builder.leftSidebar.sections.location.country.label')} path="basics.location.country" />
        <ResumeInput
          label={t('builder.leftSidebar.sections.location.postal-code.label')}
          path="basics.location.postalCode"
        />
      </div>
    </>
  );
};

export default Location;
