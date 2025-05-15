import { useState } from "react";
import { Formik, Form, Field } from "formik";
import validationSchema from "../../Validator/calcValidation.js";
import Title from "./BlurTitle/Title.jsx";
import style from "./CalculatorForm.module.css";
import intakeCalorie from "../../utils/intakeCalorie.js";
import ResultModal from "../ResultModal/ResultModal.jsx";

const CalculatorForm = () => {
  const [showErrors, setShowErrors] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [calorieResult, setCalorieResult] = useState(null);

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
      setCalorieResult(null); // hata varsa sonucu gösterme
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
        onSubmit={(values) => {
          const result = intakeCalorie(values);
          setCalorieResult(result);
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
                      {["A", "B", "AB", "0"].map((type) => (
                        <label key={type} className={style.radioLabel}>
                          <Field
                            type="radio"
                            name="bloodType"
                            value={type}
                            className={style.radioInput}
                          />
                          {type}
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
                  <h3 className={style.modalTitle}>Please Correct The Following!</h3>
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
