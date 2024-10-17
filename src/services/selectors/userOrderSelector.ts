import { TUserOrdersSlice } from '../slices/userOrderSlice';

export const selectOrders = (state: { userOrders: TUserOrdersSlice }) =>
  state.userOrders.orders;
