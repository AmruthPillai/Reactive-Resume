import { Formik } from "formik";
import { get } from "lodash";
import React, { useContext } from "react";
import * as Yup from "yup";
import Input from "../components/shared/Input";
import DatabaseContext from "../contexts/DatabaseContext";
import ModalContext from "../contexts/ModalContext";
import DataModal from "./DataModal";

const initialValues = {
  name: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Please enter at least 5 characters.")
    .required("This is a required field."),
});

const ResumeModal = () => {
  const { events } = useContext(ModalContext);
  const { createResume, updateResume } = useContext(DatabaseContext);

  const getFieldProps = (formik, name) => ({
    touched: get(formik, `touched.${name}`, false),
    error: get(formik, `errors.${name}`, ""),
    ...formik.getFieldProps(name),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <DataModal
          name="Resume"
          title={{
            create: "Create Resume",
            edit: "Edit Resume",
          }}
          onEdit={updateResume}
          onCreate={createResume}
          event={events.CREATE_RESUME_MODAL}
        >
          <Input
            label="Name"
            className="mb-8"
            placeholder="Full Stack Web Developer"
            {...getFieldProps(formik, "name")}
          />

          <p>
            You are going to be creating a new resume from scratch, but first,
            let's give it a name. This can be the name of the role you want to
            apply for, or if you're making a resume for a friend, you could call
            it Alex's Resume.
          </p>
        </DataModal>
      )}
    </Formik>
  );
};

export default ResumeModal;
