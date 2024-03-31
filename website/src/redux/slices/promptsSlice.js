import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import PromptsService from '~/services/prompts.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAction('chat/resetState');
export const getAllPrompts = createAsyncThunk(
  'prompts/get',
  (_, thunkAPI) => handleAsyncThunk(PromptsService.getAll, [], thunkAPI)
);
const promptsSlice = createSlice({
  name: 'chat',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrompts.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload;
      })
      .addCase(getAllPrompts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPrompts.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});
export const { resetState: resetStateAction } = promptsSlice.actions;
export default promptsSlice.reducer;
