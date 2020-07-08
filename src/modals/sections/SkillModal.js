import { Formik } from "formik";
import { get } from "lodash";
import React from "react";
import * as Yup from "yup";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";
import DataModal from "../DataModal";

const initialValues = {
  name: "",
  level: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This is a required field."),
  level: Yup.string().required("This is a required field."),
});

const SkillModal = () => {
  const getFieldProps = (formik, name) => ({
    touched: get(formik, `touched.${name}`, false),
    error: get(formik, `errors.${name}`, ""),
    isRequired: get(validationSchema, `fields.${name}._exclusive.required`),
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
          name="Skill"
          path="skills.items"
          event={ModalEvents.SKILL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Name"
              placeholder="ReactJS"
              {...getFieldProps(formik, "name")}
            />

            <Input
              type="select"
              label="Level"
              {...getFieldProps(formik, "level")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default SkillModal;
