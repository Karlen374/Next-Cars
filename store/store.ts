import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import car from './slices/carSlice';

const rootReducer = combineReducers({
  car,
});

export const setupStore = () => configureStore(
  {
    reducer: rootReducer,
  },
);

export type RootState = ReturnType<typeof rootReducer>;
export const Wrapper = createWrapper(setupStore);
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
