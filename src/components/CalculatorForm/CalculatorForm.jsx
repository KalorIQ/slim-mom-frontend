import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import validationSchema from "../../Validator/calcValidation.js";
import Title from "./BlurTitle/Title.jsx";
import style from "./CalculatorForm.module.css";
import intakeCalorie from "../../utils/intakeCalorie.js";
import ResultModal from "../ResultModal/ResultModal.jsx";
import { updateUserInfo } from "../../redux/auth/authOperation.js";

const CalculatorForm = () => {
  const { t, i18n } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [calorieResult, setCalorieResult] = useState(null);
  const dispatch = useDispatch();

  const handleValidation = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setShowErrors(false);
      setErrorList([]);
      return true;
    } catch (err) {
      const errorMessages = err.inner.map((e) => e.message);
      setErrorList(errorMessages);
      setShowErrors(true);
      setCalorieResult(null);
      return false;
    }
  };

  return (
    <div className={style.container} key={i18n.language}>
      <Title />
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
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values) => {
          setCalorieResult(null);
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
          } catch (error) {
            console.error("Failed to update user info:", error);
          }
        }}
      >
        {({ values, submitForm }) => (
          <>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const isValid = await handleValidation(values);
                if (isValid) {
                  submitForm();
                }
              }}
              className={style.form}
            >
              <div className={style.inputcontainer}>
                <div className={style.inputGroup}>
                  <Field
                    name="height"
                    type="number"
                    placeholder={t('calculator.height')}
                    className={style.input}
                  />
                  <Field
                    name="age"
                    type="number"
                    placeholder={t('calculator.age')}
                    className={style.input}
                  />
                  <Field
                    name="currentWeight"
                    type="number"
                    placeholder={t('calculator.currentWeight')}
                    className={style.input}
                  />
                </div>

                <div className={style.inputGroup}>
                  <Field
                    name="desiredWeight"
                    type="number"
                    placeholder={t('calculator.desiredWeight')}
                    className={style.input}
                  />

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
                  </div>

                  <button type="submit" className={style.submitButton}>
                    {t('calculator.startButton')}
                  </button>
                </div>
              </div>
            </Form>

            {/* Hata Modalı */}
            {showErrors && (
              <div className={style.modal}>
                <div className={style.modalContent}>
                  <h3 className={style.modalTitle}>
                    {t('validation.required')}
                  </h3>
                  <ul className={style.errorList}>
                    {errorList.map((err, idx) => (
                      <li key={idx} className={style.modalError}>
                        {err}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowErrors(false)}
                    className={style.modalClose}
                  >
                    {t('common.close')}
                  </button>
                </div>
              </div>
            )}

            {/* Kalori Sonucu Modalı */}
            {calorieResult !== null && !showErrors && (
              <ResultModal
                calorieResult={calorieResult}
                onClose={() => setCalorieResult(null)}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default CalculatorForm;
