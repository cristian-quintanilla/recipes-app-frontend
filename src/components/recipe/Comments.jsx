import { useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import { TextArea } from '../forms';
import { useRecipeStore } from '../../hooks';
import { GET_ME } from '../../graphql/queries';

export const Comments = ({ recipe }) => {
  const { data } = useQuery(GET_ME);
  const { isCommenting, commentRecipe, } = useRecipeStore();

  return (
    <div>
      <div className="text-zinc-600 text-lg font-semibold">
        Discussion ({ recipe.commentsCount })
      </div>

      {
        data?.getMe.name && (
          <Formik
            initialValues={{
              comment: '',
            }}
            validationSchema={
              Yup.object({
                comment: Yup.string().required('Comment is required.'),
              })
            }
            onSubmit={(values, { resetForm }) => {
              commentRecipe(recipe.id, values.comment);
              resetForm();
            }}
          >
            {() => (
              <Form className="mt-4 w-full lg:w-8/12">
                <TextArea
                  name="comment"
                  placeholder="Write a comment..."
                  rows="4"
                />

                <button
                  type="submit"
                  className="mt-4 w-48 primary-btn"
                  disabled={ isCommenting }
                >
                  <span className="text-white">Post comment</span>
                </button>
              </Form>
            )}
          </Formik>
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
