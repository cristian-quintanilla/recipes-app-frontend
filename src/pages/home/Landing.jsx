import { useQuery } from '@apollo/client';
import { NavLink, useNavigate } from 'react-router-dom';

import { GET_RECIPES } from '../../graphql/queries';
import { Header, RecipeCard } from '../../components';

import './landing.css';

export const Landing = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_RECIPES);

  const goToDetails = recipeId => {
    navigate('/recipe/' + recipeId);
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section
        className="background-image pt-16 lg:pt-48 pb-96 lg:pb-60 pl-4 md:pl-16 lg:pl-32 xl:pl-40 flex flex-col justify-center hero"
        style={{ 'marginTop': '68px' }}
      >
        <div className="w-full md:w-3/5 lg:w-2/5">
          <p className="text-xl font-semibold text-purple">RecipesApp</p>
        </div>

        <h1 className="text-4xl lg:text-6xl w-full md:w-3/5 lg:w-2/5 text-white">Your best option for sharing</h1>

        <div className="w-full md:w-3/5 lg:w-2/5 mt-2">
          <p className="text-base lg:text-lg text-white">
            With RecipesApp you can search, comment and create recipes.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="px-4 md:px-16 lg:px-32 flex items-center gap-6">
          <h2 className="text-xl lg:text-2xl font-bold">Some recipes our users created</h2>

          <NavLink
            className="text-dark-purple text-sm"
            to="/home"
          >
            See more...
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </NavLink>
        </div>

        <div className="recipes-row mt-6 ml-4 md:ml-16 lg:ml-32">
          { loading && <span className="loader"></span> }

          { data !== undefined ? <> {
            data?.recipes.recipes.map(recipe => (
              <div
                key={ recipe.id }
                className="recipe-card flex flex-col my-2 w-10/12 md:w-6/12 lg:w-3/12 hover:-translate-y-3 transition duration-500 cursor-pointer"
                onClick={ () => goToDetails(recipe.id) }
              >
                <RecipeCard recipe={ recipe } />
              </div>
            ))
          } </> : null }
        </div>
      </section>
    </main>
  );
}
