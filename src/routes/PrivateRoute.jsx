import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // useEffect(() => {
  // 	userAuthenticated();
  // }, []);

  const authenticated = true;

  //* Verify if user is authenticated
  if (!authenticated) return <Navigate to='/' />;

  return (
    <>
    {/* <Sidebar /> */}

      <div className='relative md:ml-64'>
        { children }
      </div>
    </>
  );
};

export default PrivateRoute;
