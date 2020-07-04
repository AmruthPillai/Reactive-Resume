import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import ModalContext from "../contexts/ModalContext";
import ResumeContext from "../contexts/ResumeContext";
import { getModalText } from "../utils";
import BaseModal from "./BaseModal";

const CreateResumeSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Please enter at least 5 characters.")
    .required("This is a required field."),
});

const CreateResumeModal = ({ data }) => {
  const modalRef = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const { createResumeModal } = useContext(ModalContext);
  const { createResume, updateResume } = useContext(ResumeContext);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateResumeSchema,
    onSubmit: (data) => {
      isEditMode ? updateResume(data) : createResume(data);
      modalRef.current.handleClose();
    },
  });

  useEffect(() => {
    data && formik.setValues(data) && setEditMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const submitAction = (
    <Button
      type="submit"
      title={getModalText(isEditMode, "Resume")}
      onClick={() => formik.handleSubmit()}
    />
  );

  const onDestroy = () => {
    formik.resetForm();
    setEditMode(false);
  };

  return (
    <BaseModal
      ref={modalRef}
      state={createResumeModal}
      title={getModalText(isEditMode, "Resume")}
      action={submitAction}
      onDestroy={onDestroy}
    >
      <form className="mb-8">
        <Input
          type="text"
          label="Name"
          name="name"
          placeholder="Full Stack Web Developer"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
      </form>

      <p>
        You are going to be creating a new resume from scratch, but first, let's
        give it a name. This can be the name of the role you want to apply for,
        or if you're making a resume for a friend, you could call it Alex's
        Resume.
      </p>
    </BaseModal>
  );
};

export default CreateResumeModal;
