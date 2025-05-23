import { Formik, Field, Form } from 'formik';
import style from './LoginPage.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/authSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {() => (
          <Form className={style.form} autoComplete="off">
            <h2 className={style.title}>Log In</h2>

            <input
              type="text"
              name="fake-username"
              autoComplete="username"
              style={{ display: 'none' }}
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

              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                className={style.input}
              />
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
              <button type="button" className={style.registerButton} onClick={handleRegister}>
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
