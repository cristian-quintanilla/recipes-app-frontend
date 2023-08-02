import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice';
import { userSlice } from './user/userSlice';
import { recipeSlice } from './recipe/recipeSlice';

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    recipe: recipeSlice.reducer,
  },
});
