import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { CREATE_ACCOUNT } from '../graphql/mutations';
import {
  checking,
  clearError,
  setError,
} from '../store/auth/authSlice';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { status, user, error } = useSelector(state => state.auth);

  const startRegister = async ({ name, email, password }) => {
    dispatch( checking() );

    client.mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        name,
        email,
        password
      }
    }).then(({ data }) => {
      const message = data.createAccount.message;
      toast.success(message, { duration: 3000 });

      dispatch( clearError() );
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
    startRegister,
  }
}
