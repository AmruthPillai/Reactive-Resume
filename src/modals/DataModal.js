import { useFormikContext } from "formik";
import { isEmpty, isFunction } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/shared/Button";
import ModalContext from "../contexts/ModalContext";
import ResumeContext from "../contexts/ResumeContext";
import { getModalText } from "../utils";
import BaseModal from "./BaseModal";

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

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const { emitter } = useContext(ModalContext);
  const { dispatch } = useContext(ResumeContext);
  const { values, setValues, resetForm, validateForm } = useFormikContext();

  useEffect(() => {
    const unbind = emitter.on(event, (data) => {
      setOpen(true);
      setData(data);
    });

    return () => unbind();
  }, [emitter, event]);

  useEffect(() => {
    data && setValues(data) && setEditMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (newData) => {
    if (isEmpty(await validateForm(newData))) {
      if (isEditMode) {
        if (data !== newData) {
          isFunction(onEdit)
            ? onEdit(newData)
            : dispatch({
                type: "on_edit_item",
                payload: {
                  path,
                  value: newData,
                },
              });
        }
      } else {
        newData.id = uuidv4();

        isFunction(onCreate)
          ? onCreate(newData)
          : dispatch({
              type: "on_add_item",
              payload: {
                path,
                value: newData,
              },
            });
      }

      modalRef.current.handleClose();
    }
  };

  const getTitle = isEmpty(title)
    ? getModalText(isEditMode, name)
    : isEditMode
    ? title.edit
    : title.create;

  const submitAction = (
    <Button type="submit" title={getTitle} onClick={() => onSubmit(values)} />
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

export default DataModal;
