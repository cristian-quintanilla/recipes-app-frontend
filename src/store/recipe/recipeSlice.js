import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  recipe: null,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setRecipe: (state, { payload }) => {
      state.recipe = payload;
    }
  }
});

export const {
  setLoading,
  setRecipe,
} = recipeSlice.actions;
