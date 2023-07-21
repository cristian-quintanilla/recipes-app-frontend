import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { Header, RecipeCard } from '../../components';
import { GET_MY_RECIPES } from '../../graphql/queries';

export const MyRecipes = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_MY_RECIPES);

  const goToDetails = recipeId => {
    navigate('/recipe/' + recipeId);
  }

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
                className="recipe-card flex flex-col my-2 hover:-translate-y-3 transition duration-500 cursor-pointer"
                onClick={ () => goToDetails(recipe.id) }
              >
                <RecipeCard recipe={ recipe } />
              </div>
            ))
          } </> : null }

          {/* TODO: No se encontraron recetas */}
        </div>
        </div>
      </section>
    </main>
  );
};
