import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import {
  CreateRecipe,
  Landing,
  Login,
  NotFound,
  Recipe,
  Register,
  SearchRecipes
} from '../pages';

const Router = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path='/' element={ <Landing />  } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />

      {/* Private Routes */}
      <Route path='/home' element={ <PrivateRoute children={ <SearchRecipes /> } /> } />
      <Route path='/create' element={ <PrivateRoute children={ <CreateRecipe /> } /> } />
      <Route path='/recipe/:id' element={ <PrivateRoute children={ <Recipe /> } /> } />
      {/* TODO: */}
      {/* <Route path='/me' element={ <PrivateRoute children={ <SearchRecipes /> } /> } /> */}

			{/* No Match */}
			<Route path='*' element={ <NotFound /> } />
		</Routes>
  );
}

export default Router;
