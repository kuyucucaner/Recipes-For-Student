import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/users/register', userData);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/users/login', userData);
  return response.data;
});
export const getProfile = createAsyncThunk('auth/profile', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/profile', {
      withCredentials: true, // Ensure cookies are sent with the request
      headers: {
        // Authorization: `Bearer ${token}`, // No need to include this if the token is in cookies
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    status: 'idle', // Added status

  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('accessToken'); // Clear token on logout

    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProfile.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Failed to fetch profile';
    })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
