import { useRef } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useUserStore } from '../../hooks';
import { InputText } from '../../components';

export const UpdateAccount = ({ data }) => {
  const imageUrlRef = useRef();
  const { isSaving, imageUrl, status, startUploadingFile, startUpdateAccount } = useUserStore();

  const handleFilesChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }

    startUploadingFile(target.files[0]);
  }

  return (
    <Formik
      enableReinitialize="true"
      initialValues={{
        name: data?.getMe?.name ? data.getMe.name : '',
        age: data?.getMe?.age ? data.getMe.age : 0,
        favoriteRecipe: data?.getMe?.favoriteRecipe ? data.getMe.favoriteRecipe : '',
      }}
      validationSchema={
        Yup.object({
          name: Yup.string().required('Name is required.'),
          age: Yup.number().required('Age is required.'),
        })
      }
      onSubmit={values => {
        startUpdateAccount({ ...values, imageUrl });
      }}
    >
      {() => (
        <Form className="flex-1 flex flex-col gap-6">
          <div className="mx-auto">
            <div
              className={
                `bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 cursor-pointer rounded-full
                ${ isSaving ? 'cursor-not-allowed' : '' }`
              }
              onClick={ () => imageUrlRef.current.click() }
            >
              {
                (data?.getMe.imageUrl && !imageUrl) && (
                  <img src={ data?.getMe.imageUrl } alt={ data?.getMe.name } className="rounded-full" />
                )
              }

              {
                imageUrl !== null && (
                  <img src={ imageUrl } alt={ data?.getMe.name } className="rounded-full" />
                )
              }
            </div>

            <input
              type="file"
              name="imageUrl"
              ref={ imageUrlRef }
              style={{ display: 'none' }}
              onChange={ handleFilesChange }
            />
          </div>

          <div className="mx-auto">
            <InputText
              type="text"
              name="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="mx-auto">
            <InputText
              type="number"
              name="age"
              placeholder="Age..."
            />
          </div>

          <div className="mx-auto">
            <InputText
              type="text"
              name="favoriteRecipe"
              placeholder="Favorite recipe..."
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="primary-btn"
              disabled={ status === 'updating' ? true : false }
            >
              <span className="text-white text-base">Update Account</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
