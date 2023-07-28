import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleting: state => {
      state.status = 'deleting';
      state.user   = null;
      state.error  = null;
    },
    updating: state => {
      state.status = 'updating';
      state.user   = null;
      state.error  = null;
    },
    clearError: state => {
      state.status = null;
      state.error  = null;
    },
    setError: (state, { payload }) => {
      state.status = 'error';
      state.user   = null;
      state.error  = payload;
    },
  }
});

export const {
  deleting,
  updating,
  clearError,
  setError,
} = userSlice.actions;
