import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import ChatService from '~/services/chat.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAction('chat/resetState');
export const chatWithGemini = createAsyncThunk(
  'chat/gemini',
  ({ data }, thunkAPI) => handleAsyncThunk(ChatService.gemini, [data], thunkAPI)
);
export const chatWithGpt = createAsyncThunk(
  'chat/gpt',
  ({ data }, thunkAPI) => handleAsyncThunk(ChatService.gpt, [data], thunkAPI)
);
// export const gptSpeechToText = createAsyncThunk(
//   'chat/specchToText',
//   ({ id, data }, thunkAPI) => handleAsyncThunk(ChatService.gptSpeechToText, [id, data], thunkAPI)
// );
const chatSlice = createSlice({
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
      .addCase(chatWithGemini.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload;
      })
      .addCase(chatWithGemini.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(chatWithGemini.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(chatWithGpt.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload;
      })
      .addCase(chatWithGpt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(chatWithGpt.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // .addCase(gptSpeechToText.fulfilled, (state, { payload }) => {
      //   state.status = 'success';
      //   state.data = payload;
      // })
      // .addCase(gptSpeechToText.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(gptSpeechToText.rejected, (state, { payload }) => {
      //   state.status = 'failed';
      //   state.error = payload;
      // })
      ;
  },
});
export const { resetState: resetStateAction } = chatSlice.actions;
export default chatSlice.reducer;
