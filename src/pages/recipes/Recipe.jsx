import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Header } from '../../components/Header';
import { GET_RECIPE } from '../../graphql/queries';

import { Description, Information } from '../../components/recipe';

export const Recipe = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_RECIPE, {
    variables: { recipeId: id },
  });

  if (data) {
    console.log(data)
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      {
        loading && <section
          className="mt-10 mx-auto px-4 md:px-12 lg:px-24 flex flex-col md:flex-row gap-4 lg:gap-1 w-full"
        >
          <span className="loader"></span>
        </section>
      }

      {
        data !== undefined && <section className="mt-16">
          <div
            className="background-image flex flex-col justify-end hero h-96"
            style={{
              'backgroundImage': 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(' + data.recipe.imageUrl + ')',
            }}
          >
            <div className="ml-4 lg:ml-8 mb-8 lg:mb-4 flex items-center gap-4">
              <button className="bg-white rounded-full h-12 w-12 flex flex-col items-center justify-center">
                {/* TODO: Show if theres is an user logged */}
                <span
                  className="fa-regular fa-heart text-pink-500 text-2xl"
                ></span>

                {/* <span
                  className="fa-solid fa-heart text-pink-500 text-2xl"
                ></span> */}
              </button>

              <div className="text-white text-lg font-medium">
                { data.recipe.likesCount } Likes
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-start justify-center gap-4 lg:gap-10 pb-8">
            <Information recipe={ data.recipe } />

            <Description recipe={ data.recipe } />
          </div>
        </section>
      }
    </main>
  );
}
