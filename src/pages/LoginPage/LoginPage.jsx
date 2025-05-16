import { Formik, Field, Form } from 'formik';
import style from './LoginPage.module.css';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register');
    }
  return (
    <div className={style.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
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
