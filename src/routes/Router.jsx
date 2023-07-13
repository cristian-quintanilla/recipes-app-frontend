import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
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
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={ <Landing /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/recipe/:id" element={ <Recipe /> } />
      <Route path="/home" element={ <SearchRecipes /> } />

      {/* Private Routes */}
      <Route path="/create" element={ <PrivateRoute children={ <CreateRecipe /> } /> } />
      <Route path='/me' element={ <PrivateRoute children={ <Profile /> } /> } />
      <Route path='/my-recipes' element={ <PrivateRoute children={ <MyRecipes /> } /> } />
      <Route path='/user/:id' element={ <PrivateRoute children={ <User /> } /> } />

      {/* No Match */}
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
};

export default Router;
