import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLiking: false,
  isCommenting: false,
  isUploadingImage: false,
  recipe: null,
  imageUrl: null,
  isSaving: false,
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
    },
    setSaving: (state, { payload }) => {
      state.isSaving = payload;
    },
    resetState: state => {
      state.isLoading = false;
      state.isLiking = false;
      state.isCommenting = false;
      state.isUploadingImage = false;
      state.recipe = null;
      state.imageUrl = null;
      state.isSaving = false;
    }
  }
});

export const {
  resetState,
  setCommenting,
  setSaving,
  setImageUrl,
  setIsUploadingImage,
  setLiking,
  setLoading,
  setRecipe,
} = recipeSlice.actions;
