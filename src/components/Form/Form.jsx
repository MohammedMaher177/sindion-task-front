import { Form, Formik } from "formik";
import React from "react";

export default function FormComp({
  handleSubmit,
  initialValues,
  validationSchema,
  inputs,
  loading,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        isValid,
        handleBlur,
      }) => (
        <Form className="flex flex-col gap-4">
          {inputs.map((el) => (
            <div key={el.id} className="w-full relative">
              <input
                type={el.type}
                placeholder={el.placeholder}
                id={el.id}
                name={el.id}
                value={values[el.id]}
                onBlur={handleBlur}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full	mb-6"
              />
              {errors[el.id] && touched[el.id] && (
                <span className="absolute text-red-500 bottom-0 inset-x-0">
                  {errors[el.id]}
                </span>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={!(dirty && isValid)}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
