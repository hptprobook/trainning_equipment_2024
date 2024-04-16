import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CompilerServices from '~/services/compiler.service';

// Async thunks
export const codesSaved = createAsyncThunk(
  'compiler/codesSaved',
  async (_, { rejectWithValue }) => {
    try {
      return await CompilerServices.codesSaved();
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const saveCode = createAsyncThunk(
  'compiler/saveCode',
  async (data, { rejectWithValue }) => {
    try {
      return await CompilerServices.saveCode(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const runCode = createAsyncThunk(
  'compiler/run',
  async (data, { rejectWithValue }) => {
    try {
      return await CompilerServices.run(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const nextStepAfterRun = createAsyncThunk(
  'compiler/nextStep',
  async (data, { rejectWithValue }) => {
    try {
      return await CompilerServices.nextStep(data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getDetails = createAsyncThunk(
  'compiler/getDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await CompilerServices.getDetails(id);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const shareCode = createAsyncThunk(
  'compiler/share',
  async (id, { rejectWithValue }) => {
    try {
      return await CompilerServices.share(id);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const publicCode = createAsyncThunk(
  'compiler/publicCode',
  async (id, { rejectWithValue }) => {
    try {
      return await CompilerServices.publicCode(id);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateCode = createAsyncThunk(
  'compiler/updateCode',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await CompilerServices.updateCode(id, data);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteCode = createAsyncThunk(
  'compiler/deleteCode',
  async (id, { rejectWithValue }) => {
    try {
      return await CompilerServices.deleteCode(id);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Compiler slice
const compilerSlice = createSlice({
  name: 'compiler',
  initialState: {
    data: null,
    codesSavedData: null,
    nextStepData: null,
    details: null,
    publicDetails: null,
    updatedCode: null,
    codeDeleted: false,
    status: 'idle',
    error: null,
    isNextStepLoading: false,
    isRunCodeLoading: false,
  },
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
      .addCase(codesSaved.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(codesSaved.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.codesSavedData = action.payload;
      })
      .addCase(codesSaved.rejected, (state, action) => {
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
        state.isRunCodeLoading = true;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.isRunCodeLoading = false;
        state.data = action.payload;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.isRunCodeLoading = false;
        state.error = action.payload;
      })
      // Next step
      .addCase(nextStepAfterRun.pending, (state) => {
        state.isNextStepLoading = true;
      })
      .addCase(nextStepAfterRun.fulfilled, (state, action) => {
        state.isNextStepLoading = false;
        state.nextStepData = action.payload;
      })
      .addCase(nextStepAfterRun.rejected, (state, action) => {
        state.isNextStepLoading = false;
        state.error = action.payload;
      })
      // getDetails async thunk
      .addCase(getDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
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
        state.publicDetails = action.payload;
      })
      .addCase(publicCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updatedCode = action.payload;
      })
      .addCase(updateCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCode.fulfilled, (state) => {
        state.status = 'succeeded';
        state.codeDeleted = true;
      })
      .addCase(deleteCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetCompilerState } = compilerSlice.actions;
export default compilerSlice.reducer;
