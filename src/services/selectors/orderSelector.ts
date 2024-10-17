import { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orderSlice.order;
export const selectRequest = (state: RootState) =>
  state.orderSlice.orderRequest;
