import { Field, FieldArray, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { MdAdd } from "react-icons/md";
import * as Yup from "yup";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";
import { handleKeyDown } from "../../utils";
import DataModal from "../DataModal";

const initialValues = {
  company: "",
  position: "",
  website: "https://",
  startDate: "",
  endDate: "",
  summary: "",
  highlights: [],
  __temp: "",
};

const validationSchema = Yup.object().shape({
  company: Yup.string().required("This is a required field."),
  position: Yup.string().required("This is a required field."),
  website: Yup.string().url("Must be a valid URL"),
  startDate: Yup.date().required("This is a required field."),
  endDate: Yup.date().when(
    "startDate",
    (startDate, schema) =>
      startDate &&
      schema.min(startDate, "End Date must be later than Start Date")
  ),
  summary: Yup.string().min(10, "Please enter at least 10 characters."),
  highlights: Yup.array().of(
    Yup.string().required("This is a required field.")
  ),
  __temp: Yup.string().ensure(),
});

const WorkModal = () => {
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
          path="work.items"
          name="Work Experience"
          event={ModalEvents.WORK_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label="Company"
              className="col-span-2"
              placeholder="Postdot Technologies Pvt. Ltd."
              {...getFieldProps(formik, "company")}
            />

            <Input
              label="Position"
              placeholder="Full Stack Web Developer"
              {...getFieldProps(formik, "position")}
            />

            <Input
              label="Website"
              placeholder="https://example.com/"
              {...getFieldProps(formik, "website")}
            />

            <Input
              type="date"
              label="Start Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, "startDate")}
            />

            <Input
              type="date"
              label="End Date"
              placeholder="6th August 208"
              {...getFieldProps(formik, "endDate")}
            />

            <Input
              type="textarea"
              label="Summary"
              className="col-span-2"
              {...getFieldProps(formik, "summary")}
            />

            <FieldArray
              name="highlights"
              render={(arrayHelpers) => {
                const handleClickAdd = () => {
                  formik.values.__temp &&
                    arrayHelpers.push(formik.values.__temp);
                  formik.setFieldValue("__temp", "");
                };

                return (
                  <div className="col-span-2">
                    <label>
                      <span>Highlights</span>

                      {formik.values.highlights &&
                        formik.values.highlights.map((x, i) => (
                          <Field key={i} name={`highlights.${i}`}>
                            {({ field, meta }) => (
                              <Input
                                className="my-1"
                                showDeleteItemButton
                                onDeleteItem={() => arrayHelpers.remove(i)}
                                {...field}
                                {...meta}
                              />
                            )}
                          </Field>
                        ))}

                      <div className="flex items-center">
                        <Input
                          placeholder="Worked passionately in customer service in a high volume restaurant."
                          {...getFieldProps(formik, "__temp")}
                        />
                        <MdAdd
                          size="18px"
                          tabIndex="0"
                          className="mx-4 cursor-pointer opacity-50 hover:opacity-75"
                          onKeyDown={(e) => handleKeyDown(e, handleClickAdd)}
                          onClick={handleClickAdd}
                        />
                      </div>
                    </label>
                  </div>
                );
              }}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default WorkModal;
