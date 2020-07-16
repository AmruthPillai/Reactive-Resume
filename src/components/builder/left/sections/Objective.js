import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';

const Objective = ({ name }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading>{name}</Heading>

      <Input
        type="textarea"
        label={t('shared.forms.summary')}
        path="objective.body"
      />
    </section>
  );
};

export default memo(Objective);
