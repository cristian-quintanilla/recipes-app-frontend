import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking',
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checking: state => {
      state.status = 'checking';
      state.user   = null;
      state.error  = null;
    },
    clearError: state => {
      state.status = 'not-authenticated';
      state.error  = null;
    },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user   = payload;
      state.error  = null;
    },
    logout: state => {
      state.status = 'not-authenticated';
      state.user   = null;
      state.error  = null;
    },
    setError: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user   = null;
      state.error  = payload;
    },
  }
});

export const {
  clearError,
  checking,
  login,
  logout,
  setError,
} = authSlice.actions;
