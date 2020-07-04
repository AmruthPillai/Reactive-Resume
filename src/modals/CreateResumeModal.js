import React, { useContext } from "react";
import { useFormik } from "formik";
import BaseModal from "./BaseModal";
import ModalContext from "../contexts/ModalContext";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

const CreateResumeModal = () => {
  const { createResumeModal } = useContext(ModalContext);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const submitAction = (
    <Button title="Create Resume" onClick={() => formik.handleSubmit()} />
  );

  const onDestroy = () => {
    formik.resetForm();
  };

  return (
    <BaseModal
      state={createResumeModal}
      title="Create New Resume"
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
