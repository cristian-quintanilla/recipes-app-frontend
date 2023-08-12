import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { CREATE_ACCOUNT, LOGIN } from '../graphql/mutations';

import {
  checking,
  clearError,
  login,
  logout,
  setError,
} from '../store/auth/authSlice';

import { RENEW_TOKEN } from '../graphql/queries';
import { resetState } from '../store/recipe/recipeSlice';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const navigate = useNavigate();
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
      const token = data.authLogin.token;
      const user = data.authLogin.user;

      localStorage.setItem('token', token);

      dispatch( clearError() );

      dispatch(
        login({
          uid: user._id,
          name: user.name,
          email: user.email,
        })
      );

      location.reload();
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

      // Login after register
      startLogin({
        email,
        password
      });
    }).catch(error => {
      dispatch( setError(error.message) );

      setTimeout(() => {
        dispatch( clearError() );
      }, 3000);
    });
  }

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return dispatch( logout() );
    }

    client.query({ query: RENEW_TOKEN }).then(({ data }) => {
      const token = data.renewToken.token;
      const user = data.renewToken.user;

      localStorage.setItem('token', token);

      dispatch(
        login({
          uid: user._id,
          name: user.name,
          email: user.email,
        })
      );
    }).catch(() => {
      startLogout();
    });
  }

  const startLogout = () => {
    localStorage.clear();

    dispatch( logout() );
    dispatch( resetState() );

    navigate('/');
  }

  return {
    status,
    user,
    error,
    checkToken,
    startLogin,
    startLogout,
    startRegister,
  }
}
