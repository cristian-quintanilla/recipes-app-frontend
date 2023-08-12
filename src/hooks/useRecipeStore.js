import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { Toast } from '../helpers/toast';
import { GET_RECIPE } from '../graphql/queries';
import { fileUpload } from '../helpers/fileUpload';

import {
  COMMENT_RECIPE,
  CREATE_RECIPE,
  LIKE_RECIPE,
  UPDATE_RECIPE
} from '../graphql/mutations';

import {
  resetState,
  setLoading,
  setLiking,
  setRecipe,
  setCommenting,
  setIsUploadingImage,
  setImageUrl,
  setSaving,
} from '../store/recipe/recipeSlice';

export const useRecipeStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();

  const {
    isLoading,
    isLiking,
    isSaving,
    isCommenting,
    isUploadingImage,
    imageUrl,
    recipe,
  } = useSelector(state => state.recipe);

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
      dispatch( setImageUrl(data.recipe.imageUrl) );
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

      Toast.fire({ icon: 'success', title: 'Recipe liked!', });
    }).catch(error => {
      dispatch( setLiking(false) );
      Toast.fire({ icon: 'error', title: error.message, });
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

      Toast.fire({ icon: 'success', title: 'Comment added!', });
    }).catch(error => {
      dispatch( setCommenting(false) );
      Toast.fire({ icon: 'error', title: error.message, });
    });
  }

  const startUploadingFile = async (file) => {
    dispatch( setIsUploadingImage(true) );

    const imageUrl = await fileUpload(file);
    dispatch( setImageUrl(imageUrl) );

    dispatch( setIsUploadingImage(false) );
  }

  const startCreateRecipe = data => {
    dispatch( setSaving(true) );

    client.mutate({
      mutation: CREATE_RECIPE,
      variables: {
        ...data,
      }
    }).then(() => {
      dispatch( setSaving(false) );
      Toast.fire({ icon: 'success', title: 'Recipe created!', });
      navigate('/my-recipes');
      dispatch( resetState() );
    }).catch(error => {
      dispatch( setSaving(false) );
      Toast.fire({ icon: 'error', title: error.message, });
    });
  }

  const startUpdateRecipe = data => {
    dispatch( setSaving(true) );

    client.mutate({
      mutation: UPDATE_RECIPE,
      variables: {
        ...data,
      }
    }).then(() => {
      dispatch( setSaving(false) );
      Toast.fire({ icon: 'success', title: 'Recipe updated!', });
      navigate('/my-recipes');
      dispatch( resetState() );
    }).catch(error => {
      dispatch( setSaving(false) );
      Toast.fire({ icon: 'error', title: error.message, });
    });
  }

  return {
    commentRecipe,
    getRecipe,
    imageUrl,
    isCommenting,
    isSaving,
    isLiking,
    isLoading,
    isUploadingImage,
    likeRecipe,
    recipe,
    startCreateRecipe,
    startUploadingFile,
    startUpdateRecipe,
  }
}
