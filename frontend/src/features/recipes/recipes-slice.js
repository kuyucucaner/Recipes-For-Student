// recipe-app/frontend/src/features/recipes/recipesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//getirme işlemi için async thunk
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('http://localhost:5000/api/recipes');
  return response.data;
});
// ekleme işlemi için async thunk
export const addRecipe = createAsyncThunk('recipes/addRecipe', async (newRecipe) => {
  const response = await axios.post('http://localhost:5000/api/recipes', newRecipe);
  return response.data;
});
// Güncelleme işlemi için async thunk
export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, updatedRecipe }) => {
    const response = await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
    return response.data;
  }
);

// Silme işlemi için async thunk
export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/recipes/${id}`);
    return id; // Silinen id'yi geri döndür
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state,action) =>{
        const updatedRecipe = action.payload;
        const index = state.recipes.findIndex(recipe => recipe._id === updatedRecipe._id);
        if(index!== -1 ){
          state.recipes[index] = updatedRecipe;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        const id = action.payload;
        state.recipes = state.recipes.filter(recipe => recipe._id !== id);
      });
  },
});

export default recipesSlice.reducer;
