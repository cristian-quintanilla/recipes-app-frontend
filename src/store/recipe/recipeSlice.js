import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLiking: false,
  recipe: null,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setLiking: (state, { payload }) => {
      state.isLiking = payload;
    },
    setRecipe: (state, { payload }) => {
      state.recipe = payload;
    }
  }
});

export const {
  setLiking,
  setRecipe,
  setLoading,
} = recipeSlice.actions;
