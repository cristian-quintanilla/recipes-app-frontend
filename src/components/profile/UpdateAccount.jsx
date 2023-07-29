import { useFormik } from 'formik';
import * as Yup from 'yup';

export const UpdateAccount = ({ data }) => {
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

  return (
    <form
      className="flex-1 flex flex-col gap-6"
      onSubmit={ formikUser.handleSubmit }
    >
      <div className="w-40 mx-auto">
        <div
          className="bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 p-4 cursor-pointer rounded-full"
        >
          {
            data?.getMe.imageUrl ? <img
              src={ data?.getMe.imageUrl }
              alt="User Name"
            /> : (<i className="fa-solid fa-camera text-4xl"></i>)
          }
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
  )
}
