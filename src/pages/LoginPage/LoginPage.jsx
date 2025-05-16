import { Formik, Field, Form } from 'formik';
import style from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={style.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        <Form className={style.form}>
          <h2 className={style.title}>Log In</h2>
          <div className={style.inputContainer}>
            <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={style.input}
            />

            <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className={style.input}
            />
          </div>
        <div className={style.btnContainer}>
            <button type="submit" className={style.logInButton}>
                Log In
            </button>
            <button type="button" className={style.registerButton}>
                Register
            </button>
        </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
