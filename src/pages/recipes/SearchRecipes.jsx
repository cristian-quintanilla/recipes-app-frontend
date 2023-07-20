import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { SEARCH_RECIPES } from '../../graphql/queries';
import { Header, Pagination, RecipeCard } from '../../components';

const recipesPerPage = 9;

export const SearchRecipes = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ substring, setSubstring ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalRecipes, setTotalRecipes ] = useState(0);

  useEffect(() => {
    setLoading(true);
    searchRecipes();
  }, []);

  useEffect(() => {
    setLoading(true);

    const getData = setTimeout(() => {
      searchRecipes();
    }, 2000);

    return () => clearTimeout(getData);
  }, [substring]);

  const searchRecipes = () => {
    client.query({
      query: SEARCH_RECIPES,
      variables: {
        substring,
        page: currentPage,
        size: recipesPerPage,
      }
    }).then(({ data }) => {
      setData(data);
      setTotalRecipes(data.recipes.count);

      setLoading(false);
    }).catch(() => {
      setData(null);
      setLoading(false);
    });
  }

	const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    searchRecipes();
  }

  const goToDetails = recipeId => {
    navigate('/recipe/' + recipeId);
  }

  return (
    <main className="h-screen flex flex-col">
      <Header></Header>

      <section className="mt-28 pb-10">
        <div className="w-11/12 md:w-6/12 xl:w-4/12 mx-auto shadow-md rounded-md px-4 py-2 flex items-center gap-2">
          <input
            className="flex-1 py-1 text-sm outline-none"
            type="text"
            placeholder="Search..."
            onChange={ event => setSubstring(event.target.value) }
          />
        </div>

        { loading && <div className="mt-8 w-11/12 md:w-6/12 xl:w-4/12 mx-auto">
          <div className="loader"></div>
        </div> }

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-4 md:mx-16 lg:mx-32">
          { !loading ? <> {
            data?.recipes.recipes.map(recipe => (
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

        {
          data?.recipes.recipes.length >= 1 && (
            <Pagination
              recipesPerPage={ recipesPerPage }
              totalRecipes={ totalRecipes }
              paginate={ paginate }
            />
          )
        }
      </section>
    </main>
  );
};
