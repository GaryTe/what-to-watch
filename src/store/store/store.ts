import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer/root-reducer';
import { createAPI } from '../../server/api/api';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});
