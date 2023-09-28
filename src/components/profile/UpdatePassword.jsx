import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useUserStore } from '../../hooks';
import { InputPassword } from '../../components';

export const UpdatePassword = () => {
  const { status, startUpdatePassword } = useUserStore();

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={
        Yup.object({
          password: Yup.string()
            .required('Password is required.')
            .min(6, 'Password should have at least 6 letters.'),
          confirmPassword: Yup.string()
            .required('Password is required.')
            .min(6, 'Password should have at least 6 letters.')
            .oneOf([Yup.ref('password')], 'Passwords must match.'),
        })
      }
      onSubmit={values => {
        startUpdatePassword(values.password);
      }}
    >
      {() => (
        <Form className="flex-1 flex flex-col justify-end gap-6">
          <div className="mx-auto">
            <InputPassword
              name="password"
              placeholder="Password"
            />
          </div>

          <div className="mx-auto">
            <InputPassword
              name="confirmPassword"
              placeholder="Confirm Password..."
            />
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
        </Form>
      )}
    </Formik>
  );
}
