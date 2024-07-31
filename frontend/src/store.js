// recipe-app/frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './features/recipes/recipes-slice';
import authReducer from './features/auth/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,

  },
});

