import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import validationSchema from "../../Validator/calcValidation.js";
import intakeCalorie from "../../utils/intakeCalorie.js";
import style from "./CalculateModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { updateUserInfo } from "../../redux/auth/authOperation.js";

const CalculateModal = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const [calorieResult, setCalorieResult] = useState(null);
  const dispatch = useDispatch();

  const handleUpdateUserInfo = async (userData) => {
    try {
      const result = await dispatch(updateUserInfo(userData)).unwrap();
      console.log("CalculateModal: User info updated successfully", result);
      return result;
    } catch (error) {
      console.error("CalculateModal: Failed to update user info:", error);
      throw error;
    }
  };

  return (
    <div className={style.container} key={i18n.language}>
      <h2 className={style.title}>{t('calculator.dailyCalorieNeeds')}</h2>
      <Formik
        key={i18n.language}
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
          try {
            const result = intakeCalorie(values);
            setCalorieResult(result);

            const userData = {
              height: Number(values.height),
              age: Number(values.age),
              currentWeight: Number(values.currentWeight),
              desireWeight: Number(values.desiredWeight),
              bloodType: Number(values.bloodType)
            };

            console.log("CalculateModal: Submitting user data:", userData);
            
            await handleUpdateUserInfo(userData);
            console.log("CalculateModal: Update completed successfully");
            
            // Only close modal if update was successful
            onClose();
          } catch (error) {
            console.error("CalculateModal: Submit failed:", error);
            // Don't close modal if there was an error
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, submitForm, errors, touched }) => (
          <>
            <Form className={style.form}>
              <div className={style.inputcontainer}>
                <div className={style.inputGroup}>
                  <Field name="height" type="number" placeholder={t('calculator.height')} className={style.input} />
                  <ErrorMessage name="height" component="div" className={style.error} />
                  
                  <Field name="age" type="number" placeholder={t('calculator.age')} className={style.input} />
                  <ErrorMessage name="age" component="div" className={style.error} />
                </div>
                
                <div className={style.inputGroup}>
                  <Field name="currentWeight" type="number" placeholder={t('calculator.currentWeight')} className={style.input} />
                  <ErrorMessage name="currentWeight" component="div" className={style.error} />
                  
                  <Field name="desiredWeight" type="number" placeholder={t('calculator.desiredWeight')} className={style.input} />
                  <ErrorMessage name="desiredWeight" component="div" className={style.error} />
                </div>
              </div>

              <div className={style.bloodTypeGroup}>
                <p className={style.bloodType}>{t('calculator.bloodType')}</p>
                <div className={style.radioGroup}>
                  {[
                    { label: t('bloodTypes.1'), value: "1" },
                    { label: t('bloodTypes.2'), value: "2" },
                    { label: t('bloodTypes.3'), value: "3" },
                    { label: t('bloodTypes.4'), value: "4" },
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
                </div>
                <ErrorMessage name="bloodType" component="div" className={style.error} />
              </div>

              <button type="submit" className={style.submitButton}>
                {t('calculator.calculateButton')}
              </button>
            </Form>
          </>
        )}
      </Formik>
      
      <button className={style.modalCloseTop} onClick={onClose}>
        <IoCloseSharp className={style.close} />
      </button>
    </div>
  );
};

export default CalculateModal;
