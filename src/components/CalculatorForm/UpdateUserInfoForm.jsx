import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import validationSchema from "../../Validator/calcValidation.js";
import Title from "./BlurTitle/Title.jsx";
import style from "./UpdateUserInfoForm.module.css";
import { updateUserInfo } from "../../redux/auth/authOperation.js";
import { selectUser } from "../../redux/auth/authSelectors.js";
import { toast } from "react-toastify";

const UpdateUserInfoForm = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  const userInfo = user?.infouser || {
    currentWeight: null,
    height: null,
    age: null,
    desireWeight: null,
    bloodType: null,
  };
  
  const changeButton = userInfo.currentWeight === null || 
                      userInfo.height === null || 
                      userInfo.age === null || 
                      userInfo.desireWeight === null || 
                      userInfo.bloodType === null;

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
      return false;
    }
  };

  const handleSubmit = async (values) => {
    const userData = {
      currentWeight: Number(values.currentWeight),
      height: Number(values.height),
      age: Number(values.age),
      desireWeight: Number(values.desiredWeight),
      bloodType: Number(values.bloodType),
    };

    try {
      const result = await dispatch(updateUserInfo(userData)).unwrap();
      
      toast.success(t('calculator.updateSuccess'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <div className={style.container} key={i18n.language}>
      <Title />
      <Formik
        key={i18n.language}
        initialValues={{
          height: userInfo?.height || "",
          age: userInfo?.age || "",
          currentWeight: userInfo?.currentWeight || "",
          desiredWeight: userInfo?.desireWeight || "",
          bloodType: userInfo?.bloodType?.toString() || "",
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
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
                </div>
              </div>

              <button type="submit" className={style.submitButton}>
                {changeButton ? t('calculator.startButton') : t('calculator.updateButton')}
              </button>

            </Form>

            {/* Error Modal */}
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
          </>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserInfoForm;
