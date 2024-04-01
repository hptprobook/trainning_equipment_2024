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
export const resetStateDelete = createAction('conversations/resetStateDelete');
export const handleAddConversation = createAsyncThunk(
  'conversations/add',
  ({ data }, thunkAPI) => handleAsyncThunk(ConversationsService.add, [data], thunkAPI)
);
export const handleGetAllConversations = createAsyncThunk(
  'conversations/getAll',
  (_, thunkAPI) => handleAsyncThunk(ConversationsService.getAll, [], thunkAPI)
);
export const handleDeleteConversation = createAsyncThunk(
  'conversations/delete',
  ({ id }, thunkAPI) => handleAsyncThunk(ConversationsService.delete, [id], thunkAPI)
);
export const handleArchiveConversations = createAsyncThunk(
  'conversations/archive',
  (data, thunkAPI) => handleAsyncThunk(ConversationsService.archive, [data], thunkAPI)
);
export const handleDeleteAllConversations = createAsyncThunk(
  'conversations/deleteAll',
  (_, thunkAPI) => handleAsyncThunk(ConversationsService.deleteAll, [], thunkAPI)
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
    resetStateDelete: (state) => {
      state.error = null;
      state.statusDelete = 'idle';
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
      .addCase(handleDeleteConversation.fulfilled, (state, { payload }) => {
        state.statusDelete = 'success';
        state.data = payload;
      })
      .addCase(handleDeleteConversation.pending, (state) => {
        state.statusDelete = 'loading';
      })
      .addCase(handleDeleteConversation.rejected, (state, { payload }) => {
        state.statusDelete = 'failed';
        state.error = payload;
      })
      .addCase(handleDeleteAllConversations.fulfilled, (state, { payload }) => {
        state.statusDelete = 'success';
        state.data = payload;
      })
      .addCase(handleDeleteAllConversations.pending, (state) => {
        state.statusDelete = 'loading';
      })
      .addCase(handleDeleteAllConversations.rejected, (state, { payload }) => {
        state.statusDelete = 'failed';
        state.error = payload;
      })
      .addCase(handleArchiveConversations.fulfilled, (state, { payload }) => {
        state.statusArchive = 'success';
        state.data = payload;
      })
      .addCase(handleArchiveConversations.pending, (state) => {
        state.statusArchive = 'loading';
      })
      .addCase(handleArchiveConversations.rejected, (state, { payload }) => {
        state.statusArchive = 'failed';
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
export const { resetStateDelete: resetStateDeleteAction } = conversationsSlice.actions;
export default conversationsSlice.reducer;
