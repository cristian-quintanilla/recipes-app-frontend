import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useAuthStore } from '../../hooks';

export const Login = () => {
  const [ show, setShow ] = useState(false);
  const { error, status, startLogin } = useAuthStore();

  useEffect(() => {
    if (error !== null) {
      toast.error(error, { duration: 3000 });
    }
  }, [error]);

  const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email is required.').email('Invalid email.'),
			password: Yup.string().required('Password is required.').min(6, 'Password should have at least 6 letters.'),
		}),
		onSubmit: values => {
      startLogin(values);
		}
	});

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
              src="/assets/images/auth.png"
              alt="Auth"
            />
          </div>
        </div>

        <div className="flex-1">
          <span className="hidden md:block font-medium text-3xl mb-8">Sign in</span>

          <form onSubmit={ formik.handleSubmit }>
            <div className="mb-4">
              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={ formik.values.email }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>
            {
              formik.touched.email && formik.errors.email ? (
                <div className="mt-2 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                  <p>{ formik.errors.email }</p>
                </div>
              ) : null
            }

            <div className="mb-4">
              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type={ show ? "text" : "password" }
                placeholder="Password"
                id="password"
                name="password"
                value={ formik.values.password }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />

              <span
                className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
                onClick={ () => setShow(!show) }
              ></span>
            </div>
            {
              formik.touched.password && formik.errors.password ? (
                <div className="mt-2 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                  <p>{ formik.errors.password }</p>
                </div>
              ) : null
            }

            <div>
              <button
                type="submit"
                className="primary-btn"
                disabled={ status === 'checking' ? true : false }
              >
                <span className="text-white text-base">Login</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Toaster />
    </main>
  );
};
