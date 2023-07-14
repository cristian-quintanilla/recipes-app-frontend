import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    auth: authSlice.reducer,
  },
});
