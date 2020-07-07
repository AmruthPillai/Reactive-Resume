import { useFormik } from "formik";
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
  });

  const getFieldProps = (name) => ({
    ...formik.getFieldProps(name),
    touched: formik.touched[name],
    error: formik.errors[name],
  });

  return (
    <DataModal
      formik={formik}
      path="social.items"
      name="Social Network"
      event={events.SOCIAL_MODAL}
    >
      <div className="grid grid-cols-2 gap-8">
        <Input
          type="text"
          name="network"
          label="Network"
          placeholder="Twitter"
          {...getFieldProps("network")}
        />

        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="KingOKings"
          {...getFieldProps("username")}
        />

        <Input
          type="text"
          name="url"
          label="URL"
          className="col-span-2"
          placeholder="https://twitter.com/KingOKings"
          {...getFieldProps("url")}
        />
      </div>
    </DataModal>
  );
};

export default SocialModal;
