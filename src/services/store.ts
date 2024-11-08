import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { StellarBurgerDataSlice } from './slices/stellarBurgerDataSlice';
import { BurgerConstructorSlice } from './slices/burgerConstructorSlice';
import { AuthSlice } from './slices/authUserSlice';
import { OrderSlice } from './slices/orderSlice';
import { UserOrdersSlice } from './slices/userOrderSlice';

const rootReducer = combineReducers({
  [BurgerConstructorSlice.name]: BurgerConstructorSlice.reducer,
  [StellarBurgerDataSlice.name]: StellarBurgerDataSlice.reducer,
  [AuthSlice.name]: AuthSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer,
  [UserOrdersSlice.name]: UserOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создание хуков с типами для работы с хранилищем
export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
