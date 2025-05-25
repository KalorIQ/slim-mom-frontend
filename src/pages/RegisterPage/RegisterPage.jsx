import { Formik, Field, Form } from "formik";
import style from "./RegisterPage.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/authOperation.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const RegisterPage = () => {
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
            <h2 className={style.title}>Register</h2>

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
                placeholder="Name"
                autoComplete="new-name"
                className={style.input}
              />
              <Field
                type="email"
                name="user_email"
                id="user_email"
                placeholder="Email"
                autoComplete="new-email"
                className={style.input}
              />

              <div className={style.passwordWrapper}>
              <Field
                  type={showPassword ? "text" : "password"}
                name="user_password"
                id="user_password"
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

            <div className={style.btnContainer}>
              <button type="submit" className={style.registerButton}>
                Register
              </button>
              <button
                type="button"
                className={style.logInButton}
                onClick={handleLogIn}
              >
                Log In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
