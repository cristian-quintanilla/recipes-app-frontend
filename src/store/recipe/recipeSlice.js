import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLiking: false,
  isCommenting: false,
  isUploadingImage: false,
  recipe: null,
  imageUrl: null,
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
    setCommenting: (state, { payload }) => {
      state.isCommenting = payload;
    },
    setImageUrl: (state, { payload }) => {
      state.imageUrl = payload;
    },
    setIsUploadingImage: (state, { payload }) => {
      state.isUploadingImage = payload;
    },
    setRecipe: (state, { payload }) => {
      state.recipe = payload;
    }
  }
});

export const {
  setCommenting,
  setImageUrl,
  setIsUploadingImage,
  setLiking,
  setLoading,
  setRecipe,
} = recipeSlice.actions;
