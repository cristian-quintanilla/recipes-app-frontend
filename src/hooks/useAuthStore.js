import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { CREATE_ACCOUNT, LOGIN } from '../graphql/mutations';

import {
  checking,
  clearError,
  login,
  setError,
} from '../store/auth/authSlice';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { status, user, error } = useSelector(state => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch( checking() );

    client.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password
      }
    }).then(({ data }) => {
      const message = data.authLogin.message;
      const token = data.authLogin.token;
      const user = data.authLogin.user;

      toast.success(message, { duration: 3000 });
      localStorage.setItem('token', token);

      dispatch( clearError() );

      dispatch(
        login({
          uid: user._id,
          name: user.name,
          email: user.email,
        })
      );
    }).catch(error => {
      dispatch( setError(error.message) );

      setTimeout(() => {
        dispatch( clearError() );
      }, 3000);
    });
  }

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
    startLogin,
    startRegister,
  }
}
