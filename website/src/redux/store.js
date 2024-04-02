import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import compilerReducer from './slices/compilerSlice';
import chatReducer from './slices/chatSlice';
import conversationsReducer from './slices/conversationsSlice';
import messagesReducer from './slices/messagesSlice';
import promptsReducer from './slices/promptsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    compiler: compilerReducer,
    chat: chatReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
    prompts: promptsReducer,
  },
});
export default store;
