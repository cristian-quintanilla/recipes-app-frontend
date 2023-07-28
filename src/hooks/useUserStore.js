import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { useAuthStore } from './useAuthStore';
import { DELETE_ACCOUNT, UPDATE_PASSWORD } from '../graphql/mutations';
import { deleting, updating, clearError, setError } from '../store/user/userSlice';

export const useUserStore = () => {
  const { startLogout } = useAuthStore();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { status, user, error } = useSelector(state => state.user);

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

  return {
    status,
    user,
    error,
    startDeleteAccount,
    startUpdatePassword,
  }
}
