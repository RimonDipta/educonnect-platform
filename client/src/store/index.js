import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questionReducer from './slices/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
  },
});
