import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import Swal from 'sweetalert2';

import { Toast } from '../helpers/toast';
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
      Toast.fire({ icon: 'success', title: 'Password updated successfully!', });
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
      Toast.fire({ icon: 'success', title: message, });

      Swal.fire(
        'Deleted!',
        'Your account has been deleted.',
        'success'
      );

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
    let variables = { age, favoriteRecipe, name };

    if (imageUrl) {
      variables.imageUrl = imageUrl
    }

    client.mutate({
      mutation: UPDATE_ACCOUNT,
      variables: {
        ...variables
      }
    }).then(() => {
      Toast.fire({ icon: 'success', title: 'Account updated successfully', });
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
