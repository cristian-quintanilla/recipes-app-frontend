import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import { useRecipeStore } from '../../hooks';
import { GET_ME } from '../../graphql/queries';

export const Comments = ({ recipe }) => {
  const { data } = useQuery(GET_ME);
  const { isCommenting, commentRecipe, } = useRecipeStore();

  const formik = useFormik({
		initialValues: {
			comment: '',
		},
		validationSchema: Yup.object({
			comment: Yup.string().required('Comment is required.'),
		}),
		onSubmit: values => {
      commentRecipe(recipe.id, values.comment);
		}
	});

  return (
    <div>
      <div className="text-zinc-600 text-lg font-semibold">
        Discussion ({ recipe.commentsCount })
      </div>

      {
        data?.getMe.name && (
          <form
            className="mt-4 w-full lg:w-8/12"
            onSubmit={ formik.handleSubmit }
          >
            <textarea
              className="p-2 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
              rows="4"
              placeholder="Write a comment..."
              id="comment"
              name="comment"
              value={ formik.values.comment }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
            ></textarea>
            {
              formik.touched.comment && formik.errors.comment ? (
                <div className="mt-2 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full lg:w-2/3">
                  <p>{ formik.errors.comment }</p>
                </div>
              ) : null
            }

            <button
              type="submit"
              className="mt-2 w-48 primary-btn"
              disabled={ isCommenting }
            >
              <span className="text-white">Post comment</span>
            </button>
          </form>
        )
      }

      <div className={ `w-full lg:w-8/12 ${ data?.getMe.name ? 'mt-8' : 'mt-4' }` }>
        {
          recipe.comments.map((comment, index) => (
            <div
              key={ index }
              className="p-6 mb-6 text-base bg-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-base font-semibold text-gray-900">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={ comment.user.imageUrl }
                      alt={ comment.user.name }
                    /> { comment.user.name }
                  </p>

                  <p className="text-sm text-gray-600">
                    { format (new Date(comment.date), "MMMM do',' yyyy") }
                  </p>
                </div>
              </div>

              <p className="text-gray-500">
                { comment.comment }
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
