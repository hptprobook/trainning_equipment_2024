import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import ConversationsService from '~/services/conversations.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAction('conversations/resetState');
export const handleAddConversation = createAsyncThunk(
  'conversations/add',
  ({ data }, thunkAPI) => handleAsyncThunk(ConversationsService.add, [data], thunkAPI)
);
export const handleGetAllConversations = createAsyncThunk(
  'conversations/getAll',
  (_, thunkAPI) => handleAsyncThunk(ConversationsService.getAll, [], thunkAPI)
);

const conversationsSlice = createSlice({
  name: 'conversations',
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
      .addCase(handleAddConversation.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload;
      })
      .addCase(handleAddConversation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleAddConversation.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      }) 
      .addCase(handleGetAllConversations.fulfilled, (state, { payload }) => {
        state.statusGetAll = 'success';
        state.all = payload;
      })
      .addCase(handleGetAllConversations.pending, (state) => {
        state.statusGetAll = 'loading';
      })
      .addCase(handleGetAllConversations.rejected, (state, { payload }) => {
        state.statusGetAll = 'failed';
        state.error = payload;
      });
  },
});
export const { resetState: resetStateAction } = conversationsSlice.actions;
export default conversationsSlice.reducer;
