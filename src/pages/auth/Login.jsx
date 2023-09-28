import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '../../hooks';
import { Toast } from '../../helpers/toast';
import { Header, InputPassword, InputText } from '../../components';

export const Login = () => {
  const { error, status, startLogin } = useAuthStore();

  useEffect(() => {
    if (error !== null) {
      Toast.fire({ icon: 'error', title: error, });
    }
  }, [error]);

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section
        className="mt-4 lg:mt-12 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-1 w-full"
        style={{ 'marginTop': '98px' }}
      >
        <div className="flex-1 mt-0 lg:mt-16 relative">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-3xl lg:text-5xl">Sign in to</h2>
            <h3 className='text-lg lg:text-2xl'>and start sharing recipes</h3>

            <div className="mt-4 lg:mt-8">
              <p>If you don't have an account</p>
              <p>You can <Link className="text-purple" to={'/register'}>Register here</Link>!</p>
            </div>
          </div>

          <div className="hidden lg:block absolute right-2 top-12">
            <img
              className="h-auto w-72"
              src="/auth.png"
              alt="Auth"
            />
          </div>
        </div>

        <div className="flex-1">
          <span className="hidden md:block font-medium text-3xl mb-8">Sign in</span>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={
              Yup.object({
                email: Yup.string().required('Email is required.').email('Invalid email.'),
                password: Yup.string().required('Password is required.').min(6, 'Password should have at least 6 letters.'),
              })
            }
            onSubmit={values => {
              startLogin(values);
            }}
          >
            {() => (
              <Form className="flex flex-col gap-4">
                <InputText
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                />

                <InputPassword
                  name="password"
                  placeholder="Password"
                />

                <button
                  type="submit"
                  className="primary-btn w-auto md:w-96"
                  disabled={ status === 'checking' ? true : false }
                >
                  <span className="text-white text-base">Login</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};
