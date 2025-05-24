import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import validationSchema from "../../Validator/calcValidation.js";
import Title from "./BlurTitle/Title.jsx";
import style from "./CalculatorForm.module.css";
import intakeCalorie from "../../utils/intakeCalorie.js";
import ResultModal from "../ResultModal/ResultModal.jsx";
import { updateUserInfo } from "../../redux/auth/authOperation.js";

const CalculatorForm = () => {
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
    <div className={style.container}>
      <Title />
      <Formik
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
                    placeholder="Height"
                    className={style.input}
                  />
                  <Field
                    name="age"
                    type="number"
                    placeholder="Age"
                    className={style.input}
                  />
                  <Field
                    name="currentWeight"
                    type="number"
                    placeholder="Current Weight"
                    className={style.input}
                  />
                </div>

                <div className={style.inputGroup}>
                  <Field
                    name="desiredWeight"
                    type="number"
                    placeholder="Desired Weight"
                    className={style.input}
                  />

                  <div className={style.bloodTypeGroup}>
                    <p className={style.bloodType}>Blood type</p>
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
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className={style.submitButton}>
                Start losing weight
              </button>
            </Form>

            {/* Hata Modalı */}
            {showErrors && (
              <div className={style.modal}>
                <div className={style.modalContent}>
                  <h3 className={style.modalTitle}>
                    Please Correct The Following!
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
                    Kapat
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
