import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUserStore } from '../../hooks';

export const UpdateAccount = ({ data }) => {
  const imageUrlRef = useRef();
  const { isSaving, imageUrl, status, startUploadingFile, startUpdateAccount } = useUserStore();

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
      startUpdateAccount({ ...values, imageUrl });
		}
	});

  const handleFilesChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }

    startUploadingFile(target.files[0]);
  }

  return (
    <form
      className="flex-1 flex flex-col gap-6"
      onSubmit={ formikUser.handleSubmit }
    >
      <div className="w-40 mx-auto">
        <div
          className={
            `bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 cursor-pointer rounded-full
            ${ isSaving ? 'cursor-not-allowed' : '' }`
          }
          onClick={ () => imageUrlRef.current.click() }
        >
          {
            (data?.getMe.imageUrl && !imageUrl) && <img
              src={ data?.getMe.imageUrl }
              alt={ data?.getMe.name }
              className="rounded-full"
            />
          }

          {
            imageUrl !== null && <img
            src={ imageUrl }
            alt={ data?.getMe.name }
            className="rounded-full"
          />
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
          disabled={ status === 'updating' ? true : false }
        >
          <span className="text-white text-base">Update Account</span>
        </button>
      </div>
    </form>
  )
}
