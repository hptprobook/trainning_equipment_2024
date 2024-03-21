import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CompilerServices from '~/services/compiler.service';

// Async thunks
export const codeSaved = createAsyncThunk('compiler/codeSaved', async (_, { rejectWithValue }) => {
  try {
    return await CompilerServices.codeSaved();
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const saveCode = createAsyncThunk('compiler/saveCode', async (data, { rejectWithValue }) => {
  try {
    return await CompilerServices.saveCode(data);
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const runCode = createAsyncThunk('compiler/run', async (data, { rejectWithValue }) => {
  try {
    return await CompilerServices.run(data);
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const getDetails = createAsyncThunk('compiler/getDetails', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await CompilerServices.getDetails(id, data);
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const shareCode = createAsyncThunk('compiler/share', async (id, { rejectWithValue }) => {
  try {
    return await CompilerServices.share(id);
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const publicCode = createAsyncThunk('compiler/publicCode', async (id, { rejectWithValue }) => {
  try {
    return await CompilerServices.publicCode(id);
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

// Compiler slice
const compilerSlice = createSlice({
  name: 'compiler',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {
    resetCompilerState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // codeSaved async thunk
      .addCase(codeSaved.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(codeSaved.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(codeSaved.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // saveCode async thunk
      .addCase(saveCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(saveCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // runCode async thunk
      .addCase(runCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // getDetails async thunk
      .addCase(getDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // shareCode async thunk
      .addCase(shareCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shareCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(shareCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // publicCode async thunk
      .addCase(publicCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(publicCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(publicCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetCompilerState } = compilerSlice.actions;
export default compilerSlice.reducer;
