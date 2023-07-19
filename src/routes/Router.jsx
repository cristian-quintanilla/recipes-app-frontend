import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../hooks';
import {
  CreateRecipe,
  Landing,
  Login,
  MyRecipes,
  NotFound,
  Profile,
  Recipe,
  Register,
  SearchRecipes,
  User
} from '../pages';

const Router = () => {
  const { status, checkToken } = useAuthStore();

  useEffect(() => {
    checkToken();
  }, []);

  if (status === 'checking') {
    return <h3>Loading...</h3>;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          {/* Public Route */}
          <Route path="/" element={ <Landing /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/recipe/:id" element={ <Recipe /> } />
          <Route path="/home" element={ <SearchRecipes /> } />
        </>
      ) : (
        <>
          <Route path="/" element={ <Landing /> } />
          <Route path="/home" element={ <SearchRecipes /> } />
          <Route path="/create" element={ <CreateRecipe /> } />
          <Route path='/me' element={ <Profile /> } />
          <Route path='/my-recipes' element={ <MyRecipes /> } />
          <Route path='/user/:id' element={ <User /> } />

          <Route path="/*" element={<Navigate to="/me" />} />
        </>
      )}

      {/* No Match */}
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
};

export default Router;
