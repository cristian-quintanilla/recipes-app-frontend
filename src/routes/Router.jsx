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
      <Route path='/recipe/:id' element={ <Recipe /> } />
      <Route path='/home' element={ <SearchRecipes /> } />

      {/* Private Routes */}
      <Route path='/create' element={ <PrivateRoute children={ <CreateRecipe /> } /> } />
      {/* TODO: */}
      {/* <Route path='/me' element={ <PrivateRoute children={ <Profile /> } /> } /> */}

			{/* No Match */}
			<Route path='*' element={ <NotFound /> } />
		</Routes>
  );
}

export default Router;
