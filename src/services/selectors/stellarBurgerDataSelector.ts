import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.dataSlice.ingredients;
export const selectIsLoading = (state: RootState) => state.dataSlice.isLoading;
export const selectSuccess = (state: RootState) => state.dataSlice.errors;
export const selectOrders = (state: RootState) => state.dataSlice.orders;
