import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useUserStore } from '../../hooks';
import { GET_ME } from '../../graphql/queries';

export const Profile = () => {
  const [ show, setShow ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);

  const { data } = useQuery(GET_ME);
  const { error, status, startDeleteAccount, startUpdatePassword } = useUserStore();

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

  const formikUser = useFormik({
    enableReinitialize: true,
		initialValues: {
			name: data?.getMe?.name ? data.getMe.name : '',
      age: data?.getMe?.age ? data.getMe.age : 0,
			favoriteRecipe: data?.getMe?.favoriteRecipe ? data.getMe.favoriteRecipe : '',
		},
		validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
      age: Yup.number().required('Age is required.'),
		}),
		onSubmit: values => {
      console.log(values);
		}
	});

  const deleteAccount = () => {
    startDeleteAccount();
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-semibold text-2xl xl:text-3xl text-center">
              { data?.getMe.name }
            </h2>

            <button
              type="button"
              className="red-btn"
              disabled={ status === 'deleting' ? true : false }
              onClick={ () => deleteAccount() }
            >
              <span className="text-white text-sm">Delete Account</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
            <form
              className="flex-1 flex flex-col gap-6"
              onSubmit={ formikUser.handleSubmit }
            >
              <div className="w-40 mx-auto">
                <div
                  className="bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 p-4 cursor-pointer rounded-full"
                >
                  <img
                    src={ data?.getMe.imageUrl }
                    alt="User Name"
                  />
                </div>
              </div>

              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type="text"
                  placeholder="Name..."
                  name="name"
                  value={ formikUser.values.name }
                  onChange={ formikUser.handleChange }
                  onBlur={ formikUser.handleBlur }
                />

                {
                  formikUser.touched.name && formikUser.errors.name ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                      <p>{ formikUser.errors.name }</p>
                    </div>
                  ) : null
                }
              </div>

              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type="number"
                  placeholder="Age..."
                  name="age"
                  value={ formikUser.values.age }
                  onChange={ formikUser.handleChange }
                  onBlur={ formikUser.handleBlur }
                />

                {
                  formikUser.touched.age && formikUser.errors.age ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                      <p>{ formikUser.errors.age }</p>
                    </div>
                  ) : null
                }
              </div>

              <div>
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type="text"
                  placeholder="Favorite recipe..."
                  name="favoriteRecipe"
                  value={ formikUser.values.favoriteRecipe }
                  onChange={ formikUser.handleChange }
                  onBlur={ formikUser.handleBlur }
                />

                {
                  formikUser.touched.favoriteRecipe && formikUser.errors.favoriteRecipe ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                      <p>{ formikUser.errors.favoriteRecipe }</p>
                    </div>
                  ) : null
                }
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="primary-btn"
                >
                  <span className="text-white text-base">Update Account</span>
                </button>
              </div>
            </form>

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
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
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
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
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
