import { useRef } from 'react';
import { getIn, useFormik } from 'formik';
import { useQuery } from '@apollo/client';
import * as Yup from 'yup';

import { Toast } from '../../helpers/toast';
import { GET_CATEGORIES } from '../../graphql/queries';
import { useRecipeStore } from '../../hooks/useRecipeStore';

const hours = ['00', '01', '02', '03', '04', '05'];
const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

export const EditRecipeForm = ({ recipe }) => {
  const imageUrlRef = useRef();
  const { data } = useQuery(GET_CATEGORIES);

  const {
    imageUrl,
    isSaving,
    isUploadingImage,
    startUploadingFile,
    startUpdateRecipe,
  } = useRecipeStore();

  const formik = useFormik({
    enableReinitialize: true,
		initialValues: {
      name: recipe.name,
      description: recipe.description,
      category: recipe.category.id,
      servings: recipe.servings,
      timePreparationHour: recipe.timePreparation.split(':')[0],
      timePreparationMinutes: recipe.timePreparation.split(':')[1],
      timeCookingHour: recipe.timeCooking.split(':')[0],
      timeCookingMinutes: recipe.timeCooking.split(':')[1],
      ingredients: recipe.ingredients.map(ingredient => ({
        name: ingredient.name,
      })),
      steps: recipe.steps.map(step => ({
        name: step.description,
      })),
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
      ingredients: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
        }),
      ),
      steps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
        }),
      ),
		}),
		onSubmit: values => {
      const { ingredients, steps } = values;

      if (ingredients.length === 0) {
        Toast.fire({ icon: 'error', title: 'At least one ingredient is required', });
        return;
      }

      if (steps.length === 0) {
        Toast.fire({ icon: 'error', title: 'At least one step is required', });
        return;
      }

      const data = {
        recipeId: recipe.id,
        name: values.name,
        category: values.category,
        servings: values.servings,
        description: values.description,
        ingredients: values.ingredients,
        timeCooking: values.timeCookingHour + ':' + values.timeCookingMinutes,
        steps: values.steps.map((step, index) => ({
          description: step.name,
          step: index + 1,
        })),
        timePreparation: values.timePreparationHour + ':' + values.timePreparationMinutes,
      };

      if (imageUrl) {
        data.imageUrl = imageUrl;
      }

      startUpdateRecipe(data);
		},
	});

  const handleFilesChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }

    startUploadingFile(target.files[0]);
  }

  const onAddIngredient = () => {
    let ingredients = [ ...formik.values.ingredients ];
    ingredients.push({ name: '' });

    formik.setValues({ ...formik.values, ingredients });
  }

  const onDeleteIngredient = index => {
    let ingredients = [ ...formik.values.ingredients ];
    ingredients.splice(index, 1);

    formik.setValues({ ...formik.values, ingredients });
  }

  const onAddStep = () => {
    let steps = [ ...formik.values.steps ];
    steps.push({ name: '' });

    formik.setValues({ ...formik.values, steps });
  }

  const onDeleteStep = index => {
    let steps = [ ...formik.values.steps ];
    steps.splice(index, 1);

    formik.setValues({ ...formik.values, steps });
  }

  return (
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
            imageUrl
            ? <img src={ imageUrl } alt="Image" className="h-32 w-32 rounded-full object-cover" />
            : <i className="fa-solid fa-camera text-5xl text-gray-300"></i>
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

        {formik.touched.name && formik.errors.name && (
          <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
            <p>{ formik.errors.name }</p>
          </div>
        )}
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

        {formik.touched.description && formik.errors.description && (
          <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
            <p>{ formik.errors.description }</p>
          </div>
        )}
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

            {data?.categories.map(category => (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            ))}
          </select>

          {formik.touched.category && formik.errors.category && (
            <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
              <p>{ formik.errors.category }</p>
            </div>
          )}
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

          {formik.touched.servings && formik.errors.servings && (
            <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
              <p>{ formik.errors.servings }</p>
            </div>
          )}
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

                { hours.map(hour => <option key={ hour } value={ hour }>{ hour }</option>) }
              </select>

              {formik.touched.timePreparationHour && formik.errors.timePreparationHour && (
                <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                  <p>{ formik.errors.timePreparationHour }</p>
                </div>
              )}
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

                { minutes.map(minute => <option key={ minute } value={ minute }>{ minute }</option>) }
              </select>

              {formik.touched.timePreparationMinutes && formik.errors.timePreparationMinutes && (
                <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                  <p>{ formik.errors.timePreparationMinutes }</p>
                </div>
              )}
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

                { hours.map(hour => <option key={ hour } value={ hour }>{ hour }</option>) }
              </select>

              {formik.touched.timeCookingHour && formik.errors.timeCookingHour && (
                <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                  <p>{ formik.errors.timeCookingHour }</p>
                </div>
              )}
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

                { minutes.map(minute => <option key={ minute } value={ minute }>{ minute }</option>) }
              </select>

              {formik.touched.timeCookingMinutes && formik.errors.timeCookingMinutes && (
                <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                  <p>{ formik.errors.timeCookingMinutes }</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-base font-semibold text-dark-purple block">
            Ingredients
          </span>

          <i
            className="fa-solid fa-plus text-zinc-400 cursor-pointer"
            onClick={ onAddIngredient }
          ></i>
        </div>

        <div className="flex flex-col gap-4">
          {formik.values.ingredients.map((ingredient, index) => {
            const name = `ingredients[${index}].name`;
            const touchedName = getIn(formik.touched, name);
            const errorName = getIn(formik.errors, name);

            return (
              <div
                key={ index }
                className="flex flex-wrap gap-4 lg:gap-8 items-center"
              >
                <i
                  className="fa-solid fa-trash text-zinc-400 cursor-pointer"
                  onClick={ () => onDeleteIngredient(index) }
                ></i>

                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                  type="text"
                  placeholder="Name..."
                  name={ name }
                  value={ ingredient.name }
                  onChange={ formik.handleChange }
                />

                {touchedName && errorName && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                    <p>{ formik.errors.ingredients[index].name }</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-base font-semibold text-dark-purple block">
            Steps
          </span>

          <i
            className="fa-solid fa-plus text-zinc-400 cursor-pointer"
            onClick={ onAddStep }
          ></i>
        </div>

        <div className="flex flex-col gap-4">
          {formik.values.steps.map((step, index) => {
            const name = `steps[${index}].name`;
            const touchedName = getIn(formik.touched, name);
            const errorName = getIn(formik.errors, name);

            return (
              <div
                key={ index }
                className="flex flex-wrap gap-4 lg:gap-8 items-center"
              >
                <i
                  className="fa-solid fa-trash text-zinc-400 cursor-pointer"
                  onClick={ () => onDeleteStep(index) }
                ></i>

                <input
                  className="bg-white-purple py-2 px-6 outline-none rounded-md flex-1"
                  type="text"
                  placeholder="Name..."
                  name={ name }
                  value={ step.name }
                  onChange={ formik.handleChange }
                />

                {touchedName && errorName && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full">
                    <p>{ formik.errors.steps[index].name }</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="primary-btn max-w-xs"
          disabled={ isSaving }
        >
          <span className="text-white text-base">Edit Recipe</span>
        </button>
      </div>
    </form>
  );
}
