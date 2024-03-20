import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AuthService from '~/services/auth.service';

async function handleRequest(request, arg, thunkAPI) {
  try {
    const response = await request(arg);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
export const handleGetAccessTokenGit = createAsyncThunk(
  'auth/getAccessTokenGit',
  (code, thunkAPI) => handleRequest(AuthService.getAccessTokenGit, code, thunkAPI)
);
export const handleGetUserGit = createAsyncThunk(
  'auth/getUserGit',
  (_, thunkAPI) => handleRequest(AuthService.getUserGit, null, thunkAPI)
);
export const handleAddUserFromGit = createAsyncThunk(
  'auth/addUserFromGit',
  (data, thunkAPI) => handleRequest(AuthService.addUserFromGit, data, thunkAPI)
);

export const resetState = createAction('auth/resetState');

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.tokenGit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAccessTokenGit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetAccessTokenGit.fulfilled, (state, action) => {
        state.status = 'success';
        state.tokenGit = action.payload;
      })
      .addCase(handleGetAccessTokenGit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(handleGetUserGit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetUserGit.fulfilled, (state, action) => {
        state.status = 'success';
        state.userGit = action.payload;
      })
      .addCase(handleGetUserGit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(handleAddUserFromGit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleAddUserFromGit.fulfilled, (state, action) => {
        state.status = 'success';
        state.userGit = action.payload;
      })
      .addCase(handleAddUserFromGit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetState: resetStateAction } = authSlice.actions;
export default authSlice.reducer;