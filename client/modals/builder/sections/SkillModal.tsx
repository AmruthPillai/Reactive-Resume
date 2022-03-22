import { joiResolver } from '@hookform/resolvers/joi';
import { Add, DriveFileRenameOutline } from '@mui/icons-material';
import { Button, Slider, TextField } from '@mui/material';
import { SectionPath, Skill } from '@reactive-resume/schema';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ArrayInput from '@/components/shared/ArrayInput';
import BaseModal from '@/components/shared/BaseModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { addItem, editItem } from '@/store/resume/resumeSlice';

type FormData = Skill;

const path: SectionPath = 'sections.skills';

const defaultState: FormData = {
  name: '',
  level: '',
  levelNum: 0,
  keywords: [],
};

const schema = Joi.object<FormData>().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  level: Joi.string().allow(''),
  levelNum: Joi.number().min(0).max(10).required(),
  keywords: Joi.array().items(Joi.string().optional()),
});

const SkillModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector((state) => get(state.resume, `${path}.name`));
  const { open: isOpen, payload } = useAppSelector((state) => state.modal[`builder.${path}`]);

  const item: FormData = get(payload, 'item', null);
  const isEditMode = useMemo(() => !!item, [item]);

  const addText = useMemo(() => t('builder.common.actions.add', { token: heading }), [t, heading]);
  const editText = useMemo(() => t('builder.common.actions.edit', { token: heading }), [t, heading]);

  const { reset, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultState,
    resolver: joiResolver(schema),
  });

  const onSubmit = (formData: FormData) => {
    if (isEditMode) {
      dispatch(editItem({ path: `${path}.items`, value: formData }));
    } else {
      dispatch(addItem({ path: `${path}.items`, value: formData }));
    }

    handleClose();
  };

  const handleClose = () => {
    dispatch(
      setModalState({
        modal: `builder.${path}`,
        state: { open: false },
      })
    );

    reset(defaultState);
  };

  useEffect(() => {
    if (!isEmpty(item)) {
      reset(item);
    }
  }, [item, reset]);

  return (
    <BaseModal
      icon={isEditMode ? <DriveFileRenameOutline /> : <Add />}
      isOpen={isOpen}
      handleClose={handleClose}
      heading={isEditMode ? editText : addText}
      footerChildren={<Button onClick={handleSubmit(onSubmit)}>{isEditMode ? editText : addText}</Button>}
    >
      <form className="my-2 grid grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              autoFocus
              label={t('builder.common.form.name.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="level"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t('builder.common.form.level.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="levelNum"
          control={control}
          render={({ field }) => (
            <div className="col-span-2">
              <h4 className="mb-3 font-semibold">{t('builder.common.form.levelNum.label')}</h4>

              <div className="px-3">
                <Slider
                  {...field}
                  marks={[
                    {
                      value: 0,
                      label: 'Disable',
                    },
                    {
                      value: 1,
                      label: 'Beginner',
                    },
                    {
                      value: 10,
                      label: 'Expert',
                    },
                  ]}
                  min={0}
                  max={10}
                  defaultValue={0}
                  color="secondary"
                  valueLabelDisplay="auto"
                  aria-label={t('builder.common.form.levelNum.label')}
                />
              </div>
            </div>
          )}
        />

        <Controller
          name="keywords"
          control={control}
          render={({ field, fieldState }) => (
            <ArrayInput
              label={t('builder.common.form.keywords.label')}
              value={field.value}
              onChange={field.onChange}
              errors={fieldState.error}
              className="col-span-2"
            />
          )}
        />
      </form>
    </BaseModal>
  );
};

export default SkillModal;
