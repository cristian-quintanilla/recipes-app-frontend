import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useUserStore } from '../../hooks';

export const Profile = () => {
  const [ show, setShow ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);
  const { error, status, startUpdatePassword } = useUserStore();

  useEffect(() => {
    if (error !== null) {
      toast.error(error, { duration: 3000 });
    }
  }, [error]);

  const formikPassword = useFormik({
		initialValues: {
			password: '',
      confirmPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password should have at least 6 letters.'),
      confirmPassword: Yup.string()
        .required('Password is required.')
        .min(6, 'Password should have at least 6 letters.')
        .oneOf([Yup.ref('password')], 'Passwords must match.'),
		}),
		onSubmit: values => {
      startUpdatePassword(values.password);
		}
	});

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl text-center">
            Cristian Quintanilla
          </h2>

          <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-40 mx-auto">
                <div
                  className="bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 p-4 cursor-pointer"
                >
                  <i className="fa-solid fa-camera text-5xl text-gray-300"></i>
                </div>
              </div>

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="text"
                placeholder="Name..."
              />

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="number"
                placeholder="Age..."
              />

              <input
                className="bg-white-purple py-2 px-6 outline-none rounded-md"
                type="text"
                placeholder="Favorite recipe..."
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="primary-btn"
                >
                  <span className="text-white text-base">Update Account</span>
                </button>
              </div>
            </div>

            <form
              className="flex-1 flex flex-col justify-end gap-6"
              onSubmit={ formikPassword.handleSubmit }
            >
              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type={ show ? "text" : "password" }
                  placeholder="Password..."
                  id="password"
                  name="password"
                  value={ formikPassword.values.password }
                  onChange={ formikPassword.handleChange }
                  onBlur={ formikPassword.handleBlur }
                />

                <span
                  className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ show ? 'fa-eye-slash' : 'fa-eye' }` }
                  onClick={ () => setShow(!show) }
                ></span>

                {
                  formikPassword.touched.password && formikPassword.errors.password ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                      <p>{ formikPassword.errors.password }</p>
                    </div>
                  ) : null
                }
              </div>

              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type={ showConfirm ? "text" : "password" }
                  placeholder="Confirm Password..."
                  id="confirmPassword"
                  name="confirmPassword"
                  value={ formikPassword.values.confirmPassword }
                  onChange={ formikPassword.handleChange }
                  onBlur={ formikPassword.handleBlur }
                />

                <span
                  className={ `-ml-8 z-10 fa fa-fw cursor-pointer ${ showConfirm ? 'fa-eye-slash' : 'fa-eye' }` }
                  onClick={ () => setShowConfirm(!showConfirm) }
                ></span>

                {
                  formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                      <p>{ formikPassword.errors.confirmPassword }</p>
                    </div>
                  ) : null
                }
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={ status === 'updating' ? true : false }
                >
                  <span className="text-white text-base">Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Toaster />
    </main>
  );
};
