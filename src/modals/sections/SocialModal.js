import { Formik } from "formik";
import { get } from "lodash";
import React, { useContext } from "react";
import * as Yup from "yup";
import Input from "../../components/shared/Input";
import ModalContext from "../../contexts/ModalContext";
import DataModal from "../DataModal";

const initialValues = {
  url: "https://",
  network: "",
  username: "",
};

const validationSchema = Yup.object().shape({
  network: Yup.string()
    .min(5, "Please enter at least 5 characters.")
    .required("This is a required field."),
  username: Yup.string().required("This is a required field."),
  url: Yup.string()
    .min(5, "Please enter at least 5 characters.")
    .required("This is a required field.")
    .url("Must be a valid URL"),
});

const SocialModal = () => {
  const { events } = useContext(ModalContext);

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
          path="social.items"
          name="Social Network"
          event={events.SOCIAL_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Network"
              placeholder="Twitter"
              {...getFieldProps(formik, "network")}
            />

            <Input
              label="Username"
              placeholder="KingOKings"
              {...getFieldProps(formik, "username")}
            />

            <Input
              label="URL"
              className="col-span-2"
              placeholder="https://twitter.com/KingOKings"
              {...getFieldProps(formik, "url")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default SocialModal;
