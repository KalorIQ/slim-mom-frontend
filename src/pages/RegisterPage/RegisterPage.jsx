import { Formik, Field, Form } from "formik";
import { useTranslation } from 'react-i18next';
import style from "./RegisterPage.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/authOperation.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import MobileBackground from "../../components/Background/MobileBackground.jsx";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = async (values) => {
    const { user_name, user_email, user_password } = values;
    try {
      await dispatch(
        registerUser({
          name: user_name,
          email: user_email,
          password: user_password,
        })
      ).unwrap();
      navigate("/diary");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ user_name: "", user_email: "", user_password: "" }}
        onSubmit={handleRegister}
      >
        {() => (
          <Form className={style.form} autoComplete="off">
            <h2 className={style.title}>{t('auth.registerTitle')}</h2>

            <input
              type="text"
              name="fake-username"
              autoComplete="username"
              style={{ display: "none" }}
            />

            <div className={style.inputContainer}>
              <Field
                type="name"
                name="user_name"
                id="user_name"
                placeholder={t('auth.name')}
                autoComplete="new-name"
                className={style.input}
              />
              <Field
                type="email"
                name="user_email"
                id="user_email"
                placeholder={t('auth.email')}
                autoComplete="new-email"
                className={style.input}
              />

              <div className={style.passwordWrapper}>
              <Field
                  type={showPassword ? "text" : "password"}
                name="user_password"
                id="user_password"
                placeholder={t('auth.password')}
                autoComplete="new-password"
                className={style.input}
              />
                <button
                  type="button"
                  className={style.eyeButton}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className={style.btnContainer}>
              <button type="submit" className={style.registerButton}>
                {t('auth.registerButton')}
              </button>
              <button
                type="button"
                className={style.logInButton}
                onClick={handleLogIn}
              >
                {t('auth.loginButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <MobileBackground />
    </div>
  );
};

export default RegisterPage;
