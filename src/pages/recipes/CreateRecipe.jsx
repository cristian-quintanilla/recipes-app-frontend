import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useRecipeStore } from '../../hooks/useRecipeStore';

const hours = ['00', '01', '02', '03', '04', '05'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

export const CreateRecipe = () => {
  const imageUrlRef = useRef();
  const { imageUrl, isUploadingImage, startUploadingFile } = useRecipeStore();

  const formik = useFormik({
    enableReinitialize: true,
		initialValues: {
      name: '',
      description: '',
      category: '',
      servings: '',
      timePreparationHour: '',
      timePreparationMinutes: '',
      timeCookingHour: '',
      timeCookingMinutes: '',
		},
		validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
      description: Yup.string().required('Description is required.'),
      category: Yup.string().required('Category is required.'),
      servings: Yup.number().required('Servings is required.'),
      timePreparationHour: Yup.string().required('Hours are required.'),
      timePreparationMinutes: Yup.string().required('Minutes are required.'),
      timeCookingHour: Yup.string().required('Hours are required.'),
      timeCookingMinutes: Yup.string().required('Minutes are required.'),
		}),
		onSubmit: values => {
      console.log(values);
		},
	});

  const handleFilesChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }

    startUploadingFile(target.files[0]);
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-7/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl uppercase text-center">
            Create Recipe
          </h2>

          <form
            className="flex flex-col gap-6"
            onSubmit={ formik.handleSubmit }
          >
            <div className="mx-auto">
              <div
                className={
                  `bg-white-purple hover:opacity-80 flex flex-col justify-center items-center w-32 h-32 rounded-full
                  ${ isUploadingImage ? 'cursor-not-allowed' : 'cursor-pointer' }`
                }
                onClick={ () => imageUrlRef.current.click() }
              >
                {
                  imageUrl && <img src={ imageUrl } alt="Image" className="h-32 w-32 rounded-full" />
                }

                {
                  !imageUrl && <i className="fa-solid fa-camera text-5xl text-gray-300"></i>
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
                value={ formik.values.name }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />

              {
                formik.touched.name && formik.errors.name ? (
                  <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                    <p>{ formik.errors.name }</p>
                  </div>
                ) : null
              }
            </div>

            <div>
              <textarea
                className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                rows="5"
                placeholder="Description..."
                name="description"
                value={ formik.values.description }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              ></textarea>

              {
                formik.touched.description && formik.errors.description ? (
                  <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                    <p>{ formik.errors.description }</p>
                  </div>
                ) : null
              }
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 w-full">
                <p className="text-sm text-dark-purple mb-2">
                  Category:
                </p>

                <select
                  className="w-full bg-white-purple py-2 px-6 outline-none rounded-md"
                  name="category"
                  value={ formik.values.category }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                >
                  <option value="" disabled>Select a category</option>

                  {/* TODO: Categories query */}
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                </select>

                {
                  formik.touched.category && formik.errors.category ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                      <p>{ formik.errors.category }</p>
                    </div>
                  ) : null
                }
              </div>

              <div className="flex-1 w-full">
                <p className="text-sm text-dark-purple mb-2">
                  Servings:
                </p>

                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type="number"
                  placeholder="Servings..."
                  name="servings"
                  value={ formik.values.servings }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />

                {
                  formik.touched.servings && formik.errors.servings ? (
                    <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                      <p>{ formik.errors.servings }</p>
                    </div>
                  ) : null
                }
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Preparation:
                </span>

                <div className="flex items-start">
                  <div className="flex-1 flex flex-col">
                    <select
                      className="w-full bg-white-purple py-2 px-6 outline-none rounded-md"
                      name="timePreparationHour"
                      value={ formik.values.timePreparationHour }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    >
                      <option value="" disabled>Hours</option>

                      {
                        hours.map(hour => <option key={ hour } value={ hour }>{ hour }</option>)
                      }
                    </select>

                    {
                     formik.touched.timePreparationHour && formik.errors.timePreparationHour ? (
                        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                          <p>{ formik.errors.timePreparationHour }</p>
                        </div>
                      ) : null
                    }
                  </div>

                  <div className="flex-1 flex flex-col">
                    <select
                      className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                      name="timePreparationMinutes"
                      value={ formik.values.timePreparationMinutes }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    >
                      <option value="" disabled>Minutes</option>

                      {
                        minutes.map(minute => <option key={ minute } value={ minute }>{ minute }</option>)
                      }
                    </select>

                    {
                     formik.touched.timePreparationMinutes && formik.errors.timePreparationMinutes ? (
                        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                          <p>{ formik.errors.timePreparationMinutes }</p>
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Cooking:
                </span>

                <div className="flex items-start">
                  <div className="flex-1 flex flex-col">
                    <select
                      className="w-full bg-white-purple py-2 px-6 outline-none rounded-md"
                      name="timeCookingHour"
                      value={ formik.values.timeCookingHour }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    >
                      <option value="" disabled>Hours</option>

                      {
                        hours.map(hour => <option key={ hour } value={ hour }>{ hour }</option>)
                      }
                    </select>

                    {
                     formik.touched.timeCookingHour && formik.errors.timeCookingHour ? (
                        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                          <p>{ formik.errors.timeCookingHour }</p>
                        </div>
                      ) : null
                    }
                  </div>

                  <div className="flex-1 flex flex-col">
                    <select
                      className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                      name="timeCookingMinutes"
                      value={ formik.values.timeCookingMinutes }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    >
                      <option value="" disabled>Minutes</option>

                      {
                        minutes.map(minute => <option key={ minute } value={ minute }>{ minute }</option>)
                      }
                    </select>

                    {
                     formik.touched.timeCookingMinutes && formik.errors.timeCookingMinutes ? (
                        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                          <p>{ formik.errors.timeCookingMinutes }</p>
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-base font-semibold text-dark-purple block">
                  Ingredients
                </span>

                <i className="fa-solid fa-plus text-zinc-400 cursor-pointer"></i>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 lg:gap-8 items-center">
                  <i className="fa-solid fa-trash text-zinc-400 cursor-pointer"></i>

                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Name..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-base font-semibold text-dark-purple block">
                  Steps
                </span>

                <i className="fa-solid fa-plus text-zinc-400 cursor-pointer"></i>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 lg:gap-8 items-center">
                  <i className="fa-solid fa-trash text-zinc-400 cursor-pointer"></i>

                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Name..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="primary-btn max-w-xs"
                // disabled={ status === 'updating' ? true : false }
              >
                <span className="text-white text-base">Create Recipe</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
