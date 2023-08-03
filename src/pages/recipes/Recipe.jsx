import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useRecipeStore } from '../../hooks/useRecipeStore';
import { Comments, Description, Header, Information } from '../../components';

export const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isLiking, recipe, getRecipe, likeRecipe } = useRecipeStore();

  useEffect(() => {
    getRecipe(id);
  }, []);

  const goToHome = () => {
    navigate('/home');
  }

  const like = recipeId => {
    likeRecipe(recipeId);
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      {
        isLoading && <section
          className="mt-10 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-1 w-full"
        >
          <span className="loader"></span>
        </section>
      }

      {
        recipe && <section className="mt-16">
          <div
            className="background-image flex flex-col justify-end hero h-96"
            style={{
              'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(' + recipe.imageUrl + ')',
            }}
          >
            <div className="ml-4 lg:ml-8 mb-8 lg:mb-4 flex items-center gap-4">
              <button className="bg-white rounded-full h-12 w-12 flex flex-col items-center justify-center">
                {
                  !recipe.userLiked ? (
                    <span
                      className={
                        `fa-regular fa-heart text-pink-500 text-2xl
                        ${ isLiking ? 'cursor-not-allowed opacity-50' : '' }`
                      }
                      onClick={ () => like(id) }
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

          <div className="flex flex-col lg:flex-row-reverse items-start justify-center gap-4 lg:gap-10 pb-8">
            <Information recipe={ recipe } />

            <Description recipe={ recipe } />
          </div>

          <div className="w-11/12 mx-auto mt-4 pb-8">
            <Comments recipe={ recipe } />
          </div>
        </section>
      }

      {
        !isLoading && !recipe && <section className="mt-16">
          <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
              <div className="relative">
                <div className="absolute">
                  <div className="">
                    <h1 className="my-2 text-gray-800 font-bold text-2xl">
                      Looks like the recipe doesn't exist
                    </h1>

                    <p className="my-2 text-gray-800">
                      Sorry about that! Please visit our hompage to search more recipes.
                    </p>

                    <button
                      className="my-2 border rounded md py-2 px-8 text-center bg-dark-purple text-white"
                      onClick={ goToHome }
                    >
                      Take me there!
                    </button>
                  </div>
                </div>

                <div>
                  <img
                    alt="404"
                    src="/assets/images/404.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      <Toaster />
    </main>
  );
}
