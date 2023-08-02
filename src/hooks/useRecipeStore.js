import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';

import { GET_RECIPE } from '../graphql/queries';
import { setLoading, setRecipe } from '../store/recipe/recipeSlice';

export const useRecipeStore = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { isLoading, recipe } = useSelector(state => state.recipe);

  const getRecipe = async (recipeId) => {
    dispatch( setLoading(true) );

    client.query({
      query: GET_RECIPE,
      variables: {
        recipeId,
      }
    }).then(({ data }) => {
      dispatch( setLoading(false) );
      dispatch( setRecipe(data.recipe) );
    }).catch(() => {
      dispatch( setLoading(false) );
    });
  }

  return {
    recipe,
    isLoading,
    getRecipe,
  }
}
