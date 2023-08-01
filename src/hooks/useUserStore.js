import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { useAuthStore } from './useAuthStore';
import { fileUpload } from '../helpers/fileUpload';
import { DELETE_ACCOUNT, UPDATE_ACCOUNT, UPDATE_PASSWORD } from '../graphql/mutations';

import {
  deleting,
  updating,
  clearError,
  setError,
  setSaving,
  setImageUrl,
} from '../store/user/userSlice';

export const useUserStore = () => {
  const { startLogout } = useAuthStore();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { status, user, error, isSaving, imageUrl } = useSelector(state => state.user);

  const startUpdatePassword = async (password) => {
    dispatch( updating() );

    client.mutate({
      mutation: UPDATE_PASSWORD,
      variables: {
        password,
      }
    }).then(() => {
      toast.success('Password updated successfully', { duration: 3000 });
      dispatch( clearError() );
    }).catch(error => {
      dispatch( setError(error.message) );

      setTimeout(() => {
        dispatch( clearError() );
      }, 3000);
    });
  }

  const startDeleteAccount = async () => {
    dispatch( deleting() );

    client.mutate({
      mutation: DELETE_ACCOUNT,
    })
    .then(({ data }) => {
      const message = data.deleteAccount.message;
      toast.success(message, { duration: 3000 });

      dispatch( clearError() );
      startLogout();
    }).catch(error => {
      dispatch( setError(error.message) );

      setTimeout(() => {
        dispatch( clearError() );
      }, 3000);
    });
  }

  const startUploadingFile = async (file) => {
    dispatch( setSaving() );

    const imageUrl = await fileUpload(file);
    dispatch( setImageUrl(imageUrl) );
  }

  const startUpdateAccount = async ({ age, favoriteRecipe, name, imageUrl }) => {
    dispatch( updating() );

    client.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        age,
        favoriteRecipe,
        name,
        imageUrl,
      }
    }).then(() => {
      toast.success('Account updated successfully', { duration: 3000 });
      dispatch( clearError() );
    }).catch(error => {
      dispatch( setError(error.message) );

      setTimeout(() => {
        dispatch( clearError() );
      }, 3000);
    });
  }

  return {
    error,
    imageUrl,
    isSaving,
    status,
    user,
    startDeleteAccount,
    startUpdateAccount,
    startUpdatePassword,
    startUploadingFile,
  }
}
