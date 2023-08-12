import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useAuthStore } from '../../hooks';
import { Toast } from '../../helpers/toast';

export const Register = () => {
  const [ show, setShow ] = useState(false);
  const { error, status, startRegister } = useAuthStore();

  useEffect(() => {
    if (error !== null) {
      Toast.fire({ icon: 'error', title: error, });
    }
  }, [error]);

  const formik = useFormik({
		initialValues: {
      name: '',
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
			email: Yup.string().required('Email is required.').email('Invalid email.'),
			password: Yup.string().required('Password is required.').min(6, 'Password should have at least 6 letters.'),
		}),
		onSubmit: values => {
      startRegister(values);
		}
	});

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section
        className="mt-4 lg:mt-12 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-12 w-full"
        style={{ 'marginTop': '98px' }}
      >
        <div className="flex-1 mt-0 lg:mt-16 relative">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-3xl lg:text-5xl">Sign up to</h2>
            <h3 className='text-lg lg:text-2xl'>and start sharing recipes</h3>

            <div className="mt-4 lg:mt-8">
              <p>If you already have an account</p>
              <p>You can <Link className="text-purple" to={'/login'}>Login here</Link>!</p>
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
          <span className="hidden md:block font-medium text-3xl mb-8">Sign up</span>

          <form
            className="flex flex-col gap-6 lg:gap-8"
            onSubmit={ formik.handleSubmit }
          >
            <div>
              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type="text"
                placeholder="Enter your name"
                id="name"
                name="name"
                value={ formik.values.name }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                formik.touched.name && formik.errors.name ? (
                  <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                    <p>{ formik.errors.name }</p>
                  </div>
                ) : null
              }
            </div>

            <div>
              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md w-full lg:w-2/3"
                type="email"
                placeholder="Enter email address"
                id="email"
                name="email"
                value={ formik.values.email }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                formik.touched.email && formik.errors.email ? (
                  <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                    <p>{ formik.errors.email }</p>
                  </div>
                ) : null
              }
            </div>

            <div>
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

              {
                formik.touched.password && formik.errors.password ? (
                  <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                    <p>{ formik.errors.password }</p>
                  </div>
                ) : null
              }
            </div>

            <div>
              <button
                className="primary-btn"
                type="submit"
                disabled={ status === 'checking' ? true : false }
              >
                <span className="text-white text-base">Register</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
