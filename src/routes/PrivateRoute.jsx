import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../hooks';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();

  console.log(user)

  //* Verify if user is authenticated
  if (user === null) return <Navigate to='/' />;

  return (
    <>
      { children }
    </>
  );
};

export default PrivateRoute;
