import { Formik, Field, Form } from "formik";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authOperation.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (values) => {
    console.log("In login Handle Email:", values.email);
    console.log("In login Handle Password:", values.password);
    const { email, password } = values;
    try {
      await dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/diary");
        });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {() => (
          <Form className={style.form} autoComplete="off">
            <h2 className={style.title}>Log In</h2>

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
                placeholder="Email"
                autoComplete="email"
                className={style.input}
              />

              <div className={style.passwordWrapper}>
              <Field
                  type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="new-password"
                className={style.input}
              />
                <button
                  type="button"
                  className={style.eyeButton}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className={style.forgotPasswordContainer}>
              <a href="/forgot-password" className={style.forgotPasswordLink}>
                Forgot Password?
              </a>
            </div>

            <div className={style.btnContainer}>
              <button type="submit" className={style.logInButton}>
                Log In
              </button>
              <button
                type="button"
                className={style.registerButton}
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
