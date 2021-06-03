import { isEmpty, isFunction } from 'lodash';
import { toast } from 'react-toastify';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from '../contexts/ResumeContext';
import BaseModal from './BaseModal';
import Button from '../components/shared/Button';
import ModalContext from '../contexts/ModalContext';
import { getModalText } from '../utils';

const DataModal = ({
  name,
  path,
  event,
  title,
  onEdit,
  onCreate,
  children,
}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const { emitter } = useContext(ModalContext);
  const { values, setValues, resetForm, validateForm } = useFormikContext();

  useEffect(() => {
    const unbind = emitter.on(event, (payload) => {
      setOpen(true);
      setData(payload);
    });

    return () => unbind();
  }, [emitter, event]);

  useEffect(() => {
    data && setValues(data) && setEditMode(true);
  }, [data]);

  const onSubmit = async (newData) => {
    setLoading(true);

    const errors = await validateForm();

    if (isEmpty(errors)) {
      if (isEditMode) {
        if (data !== newData) {
          isFunction(onEdit)
            ? await onEdit(newData)
            : dispatch({
                type: 'on_edit_item',
                payload: {
                  path,
                  value: newData,
                },
              });
        }
      } else {
        newData.id = uuidv4();

        isFunction(onCreate)
          ? await onCreate(newData)
          : dispatch({
              type: 'on_add_item',
              payload: {
                path,
                value: newData,
              },
            });
      }

      setLoading(false);
      modalRef.current.handleClose();
    } else {
      toast.error(t('builder.toasts.formErrors'));
      setLoading(false);
    }
  };

  const getTitle = isEmpty(title)
    ? getModalText(isEditMode, name, t)
    : isEditMode
    ? title.edit
    : title.create;

  const submitAction = (
    <Button type="submit" isLoading={loading} onClick={() => onSubmit(values)}>
      {loading ? t('shared.buttons.loading') : getTitle}
    </Button>
  );

  const onDestroy = () => {
    resetForm();
    setEditMode(false);
    setData(null);
  };

  return (
    <BaseModal
      ref={modalRef}
      action={submitAction}
      onDestroy={onDestroy}
      state={[open, setOpen]}
      title={getTitle}
    >
      {children}
    </BaseModal>
  );
};

export default memo(DataModal);
