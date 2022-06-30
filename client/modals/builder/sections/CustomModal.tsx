import { joiResolver } from '@hookform/resolvers/joi';
import { Add, DriveFileRenameOutline } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Slider, TextField } from '@mui/material';
import { Custom } from '@reactive-resume/schema';
import dayjs from 'dayjs';
import Joi from 'joi';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ArrayInput from '@/components/shared/ArrayInput';
import BaseModal from '@/components/shared/BaseModal';
import MarkdownSupported from '@/components/shared/MarkdownSupported';
import { VALID_URL_REGEX } from '@/constants/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { addItem, editItem } from '@/store/resume/resumeSlice';

type FormData = Custom;

export type CustomModalPayload = {
  path: string;
  item?: Custom;
};

const defaultState: FormData = {
  title: '',
  subtitle: '',
  date: {
    start: '',
    end: '',
  },
  url: '',
  level: '',
  levelNum: 0,
  summary: '',
  keywords: [],
};

const schema = Joi.object<FormData>().keys({
  id: Joi.string(),
  title: Joi.string().required(),
  subtitle: Joi.string().allow(''),
  date: Joi.object().keys({
    start: Joi.string().allow(''),
    end: Joi.string().allow(''),
  }),
  url: Joi.string().pattern(VALID_URL_REGEX, { name: 'valid URL' }).allow(''),
  level: Joi.string().allow(''),
  levelNum: Joi.number().min(0).max(10),
  summary: Joi.string().allow(''),
  keywords: Joi.array().items(Joi.string().optional()),
});

const CustomModal: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const heading = useAppSelector((state) => get(state.resume, `${path}.name`));
  const { open: isOpen, payload } = useAppSelector((state) => state.modal['builder.sections.custom']);

  const path: string = get(payload, 'path', '');
  const item: FormData = get(payload, 'item', null);
  const isEditMode = useMemo(() => !!item, [item]);

  const addText = useMemo(() => t<string>('builder.common.actions.add', { token: heading }), [t, heading]);
  const editText = useMemo(() => t<string>('builder.common.actions.edit', { token: heading }), [t, heading]);

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
        modal: 'builder.sections.custom',
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
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              autoFocus
              label={t<string>('builder.common.form.title.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="subtitle"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t<string>('builder.common.form.subtitle.label')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="date.start"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              openTo="year"
              label={t<string>('builder.common.form.start-date.label')}
              views={['year', 'month', 'day']}
              onChange={(date: Date | null, keyboardInputValue: string | undefined) => {
                isEmpty(keyboardInputValue) && field.onChange('');
                date && dayjs(date).isValid() && field.onChange(date.toISOString());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || params.inputProps?.placeholder}
                />
              )}
            />
          )}
        />

        <Controller
          name="date.end"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              openTo="year"
              label={t<string>('builder.common.form.end-date.label')}
              views={['year', 'month', 'day']}
              onChange={(date: Date | null, keyboardInputValue: string | undefined) => {
                isEmpty(keyboardInputValue) && field.onChange('');
                date && dayjs(date).isValid() && field.onChange(date.toISOString());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || 'Leave this field blank, if still present'}
                />
              )}
            />
          )}
        />

        <Controller
          name="url"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={t<string>('builder.common.form.url.label')}
              placeholder="https://"
              className="col-span-2"
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
              label={t<string>('builder.common.form.level.label')}
              className="col-span-2"
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
              <h4 className="mb-3 font-semibold">{t<string>('builder.common.form.levelNum.label')}</h4>

              <div className="px-10">
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
                  aria-label={t<string>('builder.common.form.levelNum.label')}
                />
              </div>
            </div>
          )}
        />

        <Controller
          name="summary"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              multiline
              minRows={3}
              maxRows={6}
              label={t<string>('builder.common.form.summary.label')}
              className="col-span-2"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || <MarkdownSupported />}
              {...field}
            />
          )}
        />

        <Controller
          name="keywords"
          control={control}
          render={({ field, fieldState }) => (
            <ArrayInput
              label={t<string>('builder.common.form.keywords.label')}
              value={field.value as string[]}
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

export default CustomModal;
