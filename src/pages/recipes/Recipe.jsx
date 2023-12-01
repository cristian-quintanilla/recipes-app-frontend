import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Toast } from '../../helpers/toast';
import { useAuthStore, useRecipeStore } from '../../hooks';
import { Comments, Description, Header, Information, NotFoundRecipe } from '../../components';

export const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { isLoading, isLiking, recipe, getRecipe, likeRecipe } = useRecipeStore();

  useEffect(() => {
    getRecipe(id);
  }, []);

  const like = recipeId => {
    if (!user) {
      Toast.fire({ icon: 'error', title: 'You need to be logged in to like the recipe' });
    } else {
      likeRecipe(recipeId);
    }
  }

  const goBack = () => {
    navigate(-1);
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      {
        isLoading && (
          <section className="mt-10 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-1 w-full">
            <span className="loader"></span>
          </section>
        )
      }

      {
        recipe && !isLoading && <section className="mt-16">
          <div
            className="background-image hero flex flex-col justify-between h-96"
            style={{
              'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(' + recipe.imageUrl + ')',
            }}
          >
            <div className="ml-4 mt-4 text-white">
              <div
                onClick={ goBack }
                className="flex items-center gap-4 cursor-pointer hover:opacity-80 w-24"
              >
                <span className="fa-solid fa-arrow-left text-lg"></span>
                <span className="font-semibold text-xl">Back</span>
              </div>
            </div>

            <div className="ml-4 lg:ml-8 mb-8 lg:mb-4 flex items-center gap-4">
              <button
                className="bg-white rounded-full h-12 w-12 flex flex-col items-center justify-center"
                onClick={ () => like(id) }
              >
                {
                  !recipe.userLiked ? (
                    <span
                      className={`fa-regular fa-heart text-pink-500 text-2xl ${ isLiking ? 'cursor-not-allowed opacity-50' : '' }`}
                    ></span>
                  ) : (
                    <span
                      className="fa-solid fa-heart text-pink-500 text-2xl"
                    ></span>
                  )
                }
              </button>

              <div className="text-white text-lg font-medium">
                { recipe.likesCount } Likes
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start justify-center gap-4 lg:gap-10 pb-8 z-10">
            <Information recipe={ recipe } />

            <Description recipe={ recipe } />
          </div>

          <div className="w-11/12 mx-auto mt-4 pb-8">
            <Comments recipe={ recipe } />
          </div>
        </section>
      }

      {
        !isLoading && !recipe && (<NotFoundRecipe />)
      }
    </main>
  );
}
