import { useState } from "react";
import style from "./CalculatorForm.module.css";
import Modal from "../intakeModal/index";
import { useDispatch, useSelector } from "react-redux";
import { calculaterUser } from "../../redux/auth/authOperation"; //??//
import intakeCalorie from "../../utils/intakeCalories";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CalculatorForm = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formik initial values
  const initialValues = {
    height: "",
    age: "",
    currentWeight: "",
    desiredWeight: "",
    bloodType: "",
  };

  // Formik submission function
  const handleSubmit = (values) => {
    const { currentWeight, height, age, desiredWeight } = values;
    const calculatedCalories = intakeCalorie({
      currentWeight,
      height,
      age,
      desiredWeight,
    });

    if (!currentWeight || !height || !age || !desiredWeight) {
      alert("Please fill in all fields!");
      return;
    }
    if (accessToken) {
      dispatch(calculaterUser(values, accessToken));
    } else {
      setResult(calculatedCalories);
    }
    setIsModalOpen(true);
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Calculate your daily calorie intake right now
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={style.form}>
            <div className={style.inputGroup}>
              <div className={style.column1}>
                <label className={style.label}>
                  <Field
                    type="number"
                    name="height"
                    className={style.input}
                    placeholder="Height*"
                    required
                  />
                  <ErrorMessage name="height" component="div" className={style.error} />
                </label>

                <label className={style.label}>
                  <Field
                    type="number"
                    name="age"
                    className={style.input}
                    placeholder="Age*"
                    required
                  />
                  <ErrorMessage name="age" component="div" className={style.error} />
                </label>

                <label className={style.label}>
                  <Field
                    type="number"
                    name="currentWeight"
                    className={style.input}
                    placeholder="Current weight*"
                    required
                  />
                  <ErrorMessage name="currentWeight" component="div" className={style.error} />
                </label>
              </div>

              <div className={style.column2}>
                <label className={style.label}>
                  <Field
                    type="number"
                    name="desiredWeight"
                    className={style.input}
                    placeholder="Desired weight*"
                    required
                  />
                  <ErrorMessage name="desiredWeight" component="div" className={style.error} />
                </label>

                <div className={style.bloodTypeGroup}>
                  <p className={style.bloodType}>Blood type*</p>
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

            <button className={style.button} type="submit">
              Start losing weight
            </button>
          </Form>
        )}
      </Formik>

      {isModalOpen && (
        <Modal
          result={result}
          formData={initialValues}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CalculatorForm;
