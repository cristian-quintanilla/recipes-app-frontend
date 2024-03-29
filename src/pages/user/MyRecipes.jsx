import { useQuery } from '@apollo/client';

import { GET_MY_RECIPES } from '../../graphql/queries';
import { Header, NoData, RecipeCard } from '../../components';

export const MyRecipes = () => {
  const { loading, data } = useQuery(GET_MY_RECIPES);

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="flex flex-col gap-8 lg:gap-10 w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
          <h2 className="font-semibold text-2xl xl:text-3xl uppercase text-center">
            My Recipes
          </h2>

          { loading && <div className="w-11/12 md:w-6/12 xl:w-4/12 mx-auto">
            <div className="loader"></div>
          </div> }

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            { !loading ? <> {
              data?.getMe.recipes.map(recipe => (
                <div
                  key={ recipe.id }
                  className="recipe-card flex flex-col my-2 hover:-translate-y-3 transition duration-500"
                >
                  <RecipeCard recipe={ recipe } isEditing={ true } />
                </div>
              ))
            } </> : null }
          </div>

          {
            data?.getMe.recipes.length === 0 && (
              <div className="w-11/12 md:w-6/12 xl:w-4/12 mx-auto flex justify-center">
                <NoData />
              </div>
            )
          }
        </div>
      </section>
    </main>
  );
};
