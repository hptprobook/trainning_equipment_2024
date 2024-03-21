import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import compilerReducer from './slices/compilerSlice';
// import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    compiler: compilerReducer,
  },
});
export default store;
