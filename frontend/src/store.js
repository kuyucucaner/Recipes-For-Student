// recipe-app/frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './features/recipes/recipesSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,

  },
});

