import { configureStore } from '@reduxjs/toolkit';
import { load } from 'redux-localstorage-simple';
import { useDispatch } from 'react-redux'
import blockReducer from './block';
import user from './user/reducer'

const PERSISTED_KEYS: string[] = ['user']; // ['user', 'transactions', 'lists', 'profile'];

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    // Exchange
    user,
  },
  preloadedState: load({ states: PERSISTED_KEYS }),
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
