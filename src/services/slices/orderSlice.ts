import { TNewOrderResponse, orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeAnOrder = createAsyncThunk(
  'make/order',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export type TOrderSlice = {
  orderRequest: boolean;
  order: TOrder | null;
  error: string | null;
};

export const initialState: TOrderSlice = {
  orderRequest: false,
  order: null,
  error: null
};

export const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orderRequest = false;
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeAnOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(
        makeAnOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.error = null;
          state.order = action.payload.order;
        }
      );
  }
});

export const { clearOrderState } = OrderSlice.actions;

export default OrderSlice.reducer;
