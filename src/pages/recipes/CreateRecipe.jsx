import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';
import { useRecipeStore } from '../../hooks/useRecipeStore';

export const CreateRecipe = () => {
  const imageUrlRef = useRef();
  const { imageUrl, isUploadingImage, startUploadingFile } = useRecipeStore();

  const formik = useFormik({
    enableReinitialize: true,
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
		}),
		onSubmit: values => {
      console.log(values);
		}
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

            <input
              className="bg-white-purple py-2 px-6 outline-none rounded-md"
              type="text"
              placeholder="Name..."
            />

            <textarea
              className="bg-white-purple py-2 px-6 outline-none rounded-md"
              rows="5"
              placeholder="Description..."
            ></textarea>

            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <div className="flex-1 flex flex-col gap-2 w-full">
                <span className="text-sm text-dark-purple block">
                  Category:
                </span>

                <select
                  className="w-full bg-white-purple py-2 px-6 outline-none rounded-md"
                >
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                </select>
              </div>

              <div className="flex-1 w-full">
                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md w-full"
                  type="number"
                  placeholder="Servings..."
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row lg:items-end gap-4">
              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Preparation:
                </span>

                <div className="flex">
                  <select
                    className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">01</option>
                    <option value="2">02</option>
                    <option value="2">03</option>
                    <option value="2">04</option>
                    <option value="2">05</option>
                  </select>

                  <select
                    className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">05</option>
                    <option value="2">10</option>
                    <option value="2">15</option>
                    <option value="2">20</option>
                    <option value="2">25</option>
                    <option value="2">30</option>
                    <option value="2">35</option>
                    <option value="2">40</option>
                    <option value="2">45</option>
                    <option value="2">50</option>
                    <option value="2">55</option>
                  </select>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-sm text-dark-purple block mb-2">
                  Time Cooking:
                </span>

                <div className="flex">
                  <select
                    className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">01</option>
                    <option value="2">02</option>
                    <option value="2">03</option>
                    <option value="2">04</option>
                    <option value="2">05</option>
                  </select>

                  <select
                    className="flex-1 bg-white-purple py-2 px-6 outline-none rounded-md"
                  >
                    <option value="1">00</option>
                    <option value="2">05</option>
                    <option value="2">10</option>
                    <option value="2">15</option>
                    <option value="2">20</option>
                    <option value="2">25</option>
                    <option value="2">30</option>
                    <option value="2">35</option>
                    <option value="2">40</option>
                    <option value="2">45</option>
                    <option value="2">50</option>
                    <option value="2">55</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-semibold text-dark-purple block mb-2">
                Ingredients
              </span>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 lg:gap-8 items-center">
                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Name..."
                  />

                  <button
                    type="button"
                    className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-base font-semibold text-dark-purple block mb-2">
                Steps
              </span>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 lg:gap-8 items-center">
                  <input
                    className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                    type="text"
                    placeholder="Step..."
                  />

                  <button
                    type="button"
                    className="text-sm bg-dark-purple border-2 border-dark-purple px-4 py-2 rounded-md text-white font-bold"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
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
