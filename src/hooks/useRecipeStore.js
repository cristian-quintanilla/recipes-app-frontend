import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { GET_RECIPE } from '../graphql/queries';
import { COMMENT_RECIPE, LIKE_RECIPE } from '../graphql/mutations';
import { setLoading, setLiking, setRecipe, setCommenting } from '../store/recipe/recipeSlice';

export const useRecipeStore = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { isLoading, isLiking, isCommenting, recipe } = useSelector(state => state.recipe);

  const getRecipe = recipeId => {
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

  const likeRecipe = recipeId => {
    dispatch( setLiking(true) );

    client.mutate({
      mutation: LIKE_RECIPE,
      variables: {
        recipeId,
      }
    }).then(() => {
      const newRecipe = {
        ...recipe,
        userLiked: !recipe.userLiked,
      }

      dispatch( setLiking(false) );
      dispatch( setRecipe(newRecipe) );

      toast.success('Recipe liked!', { duration: 3000 });
    }).catch(error => {
      dispatch( setLiking(false) );
      toast.error(error.message, { duration: 3000 });
    });
  }

  const commentRecipe = (recipeId, comment) => {
    dispatch( setCommenting(true) );

    client.mutate({
      mutation: COMMENT_RECIPE,
      variables: {
        recipeId,
        comment,
      }
    }).then(({ data }) => {
      const newRecipe = {
        ...recipe,
        comments: [ data.commentRecipe, ...recipe.comments ],
      }

      dispatch( setCommenting(false) );
      dispatch( setRecipe(newRecipe) );

      toast.success('Comment added!', { duration: 3000 });
    }).catch(error => {
      dispatch( setCommenting(false) );
      toast.error(error.message, { duration: 3000 });
    });
  }

  return {
    recipe,
    isLiking,
    isLoading,
    isCommenting,
    getRecipe,
    likeRecipe,
    commentRecipe,
  }
}
