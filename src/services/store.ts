import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { StellarBurgerDataSlice } from './slices/stellarBurgerDataSlice';
import { BurgerConstructorSlice } from './slices/burgerConstructorSlice';
import { AuthSlice } from './slices/authUserSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducer from './slices/userOrderSlice';

const rootReducer = combineReducers({
  [BurgerConstructorSlice.name]: BurgerConstructorSlice.reducer,
  [StellarBurgerDataSlice.name]: StellarBurgerDataSlice.reducer,
  [AuthSlice.name]: AuthSlice.reducer,
  orderSlice: orderReducer,
  userOrders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
