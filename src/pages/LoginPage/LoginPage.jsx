import { Formik, Field, Form } from "formik";
import { useTranslation } from 'react-i18next';
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authOperation.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import MobileBackground from "../../components/Background/MobileBackground.jsx";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate("/diary");
      })
      .catch((error) => {
        console.error("Login error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={style.form} autoComplete="off">
            <h2 className={style.title}>{t('auth.loginTitle')}</h2>

            <input
              type="text"
              name="fake-username"
              autoComplete="username"
              style={{ display: "none" }}
            />

            <div className={style.inputContainer}>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder={t('auth.email')}
                autoComplete="new-email"
                className={style.input}
              />

              <div className={style.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
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

            <div className={style.forgotPasswordContainer}>
              <a href="/forgot-password" className={style.forgotPasswordLink}>
                {t('auth.forgotPassword')}
              </a>
            </div>

            <div className={style.btnContainer}>
              <button type="submit" className={style.logInButton}>
                {t('auth.loginButton')}
              </button>
              <button
                type="button"
                className={style.registerButton}
                onClick={handleRegister}
              >
                {t('auth.registerButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <MobileBackground />
    </div>
  );
};

export default LoginPage;
