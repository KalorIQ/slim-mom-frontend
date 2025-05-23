import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../Validator/calcValidation.js";
import intakeCalorie from "../../utils/intakeCalorie.js";
import style from "./CalculateModal.module.css";
import { IoCloseSharp } from "react-icons/io5";

const CalculateModal = ({ onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [calorieResult, setCalorieResult] = useState(null);



  return (
    <div className={style.container}>
      <h2 className={style.title}>Calculate Your Daily Calorie Needs</h2>
      <Formik
        initialValues={{
          height: "",
          age: "",
          currentWeight: "",
          desiredWeight: "",
          bloodType: "",
        }}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          const result = intakeCalorie(values);
          setCalorieResult(result);
          setSubmitting(false);
        }}
      >
        {({ values, submitForm, errors, touched }) => (
          <>
            <Form
              className={style.form}
            >
              <div className={style.inputGroup}>
                <Field name="height" type="number" placeholder="Height" className={style.input} />
                <ErrorMessage name="height" component="div" className={style.error} />
                <Field name="age" type="number" placeholder="Age" className={style.input} />
                <ErrorMessage name="age" component="div" className={style.error} />
                <Field name="currentWeight" type="number" placeholder="Current Weight" className={style.input} />
                <ErrorMessage name="currentWeight" component="div" className={style.error} />
                <Field name="desiredWeight" type="number" placeholder="Desired Weight" className={style.input} />
                <ErrorMessage name="desiredWeight" component="div" className={style.error} />
              </div>

              <div className={style.bloodTypeGroup}>
                <p className={style.bloodType}>Blood Type</p>
                <div className={style.radioGroup}>
                  {["A", "B", "AB", "0"].map((type) => (
                    <label key={type} className={style.radioLabel}>
                      <Field type="radio" name="bloodType" value={type} className={style.radioInput} />
                      {type}
                    </label>
                  ))}
                  <ErrorMessage name="bloodType" component="div" className={style.error} />
                </div>
              </div>

              <button type="submit" className={style.submitButton}>Calculate</button>
            </Form>

          </>
        )}
      </Formik>
      <button className={style.modalCloseTop} onClick={onClose}><IoCloseSharp className={style.close} /></button>
    </div>
  );
};

export default CalculateModal;
