import { Formik } from "formik";
import { get } from "lodash";
import React from "react";
import * as Yup from "yup";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";
import DataModal from "../DataModal";

const initialValues = {
  title: "",
  awarder: "",
  date: "",
  summary: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("This is a required field."),
  awarder: Yup.string().required("This is a required field."),
  date: Yup.date().max(new Date()),
  summary: Yup.string(),
});

const AwardModal = () => {
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
          path="awards.items"
          name="Awards"
          event={ModalEvents.AWARD_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Title"
              className="col-span-2"
              placeholder="Intl. Flutter Hackathon '19"
              {...getFieldProps(formik, "title")}
            />

            <Input
              label="Awarder"
              placeholder="Google"
              {...getFieldProps(formik, "awarder")}
            />

            <Input
              type="date"
              label="Date"
              {...getFieldProps(formik, "date")}
            />

            <Input
              type="textarea"
              label="Summary"
              className="col-span-2"
              {...getFieldProps(formik, "summary")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default AwardModal;
