import { Formik, Field, Form } from "formik";
import style from "./RegisterPage.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/authOperation.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

              <Field
                type="password"
                name="user_password"
                id="user_password"
                placeholder="Password"
                autoComplete="new-password"
                className={style.input}
              />
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
