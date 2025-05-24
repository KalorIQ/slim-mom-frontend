import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import validationSchema from "../../Validator/calcValidation.js";
import intakeCalorie from "../../utils/intakeCalorie.js";
import style from "./CalculateModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { updateUserInfo } from "../../redux/auth/authOperation.js";

const CalculateModal = ({ onClose }) => {
  const [calorieResult, setCalorieResult] = useState(null);
  const dispatch = useDispatch();

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
        onSubmit={async (values, { setSubmitting }) => {
          const result = intakeCalorie(values);
          setCalorieResult(result);

          // Kullanıcı bilgilerini güncelle
          const userData = {
            height: Number(values.height),
            age: Number(values.age),
            currentWeight: Number(values.currentWeight),
            desireWeight: Number(values.desiredWeight),
            bloodType: Number(values.bloodType),
            dailyRate: result
          };

          try {
            await dispatch(updateUserInfo(userData)).unwrap();
            onClose(); // Başarılı güncelleme sonrası modalı kapat
          } catch (error) {
            console.error("Failed to update user info:", error);
          }
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
                  {[
                    { label: "A", value: "1" },
                    { label: "B", value: "2" },
                    { label: "AB", value: "3" },
                    { label: "0", value: "4" },
                  ].map((type) => (
                    <label key={type.value} className={style.radioLabel}>
                      <Field
                        type="radio"
                        name="bloodType"
                        value={type.value}
                        className={style.radioInput}
                      />
                      {type.label}
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
