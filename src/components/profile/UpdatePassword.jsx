import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUserStore } from '../../hooks';

export const UpdatePassword = () => {
  const [ show, setShow ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);
  const { status, startUpdatePassword } = useUserStore();

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
  )
}
