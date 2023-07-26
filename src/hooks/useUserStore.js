import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import toast from 'react-hot-toast';

import { UPDATE_PASSWORD } from '../graphql/mutations';
import { updating, clearError, setError } from '../store/user/userSlice';

export const useUserStore = () => {
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

  return {
    status,
    user,
    error,
    startUpdatePassword,
  }
}
