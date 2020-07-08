import { Formik } from "formik";
import { get } from "lodash";
import React from "react";
import * as Yup from "yup";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";
import DataModal from "../DataModal";

const initialValues = {
  title: "",
  issuer: "",
  date: "",
  summary: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("This is a required field."),
  issuer: Yup.string().required("This is a required field."),
  date: Yup.date().max(new Date()),
  summary: Yup.string(),
});

const CertificateModal = () => {
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
          name="Certificate"
          path="certifications.items"
          event={ModalEvents.CERTIFICATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Title"
              className="col-span-2"
              placeholder="CCNP"
              {...getFieldProps(formik, "title")}
            />

            <Input
              label="Issuer"
              placeholder="Cisco Systems"
              {...getFieldProps(formik, "issuer")}
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

export default CertificateModal;
