import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import MessagesService from '~/services/messages.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAction('messages/resetState');
export const handleGetMessageByID = createAsyncThunk(
  'messages/getByID',
  ({ id }, thunkAPI) => handleAsyncThunk(MessagesService.getByID, [id], thunkAPI)
);
const messagesSlice = createSlice({
  name: 'messages',
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
      .addCase(handleGetMessageByID.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload;
      })
      .addCase(handleGetMessageByID.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetMessageByID.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});
export const { resetState: resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
