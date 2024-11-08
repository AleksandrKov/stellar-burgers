import { getOrdersApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk('get/orders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

export type TUserOrdersSlice = {
  orders: TOrder[];
  error: string | null;
};

export const initialState: TUserOrdersSlice = {
  orders: [],
  error: null
};

export const UserOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = String(action.error.message);
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.error = null;
          state.orders = action.payload;
        }
      );
  }
});

export default UserOrdersSlice.reducer;
