// import { getFeedsApi, getIngredientsApi } from '@api';
// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { TIngredient, TOrdersData } from '@utils-types';
// import { RootState } from '../store';

// export type TDataState = {
//   ingredients: {
//     bun: TIngredient[];
//     sauce: TIngredient[];
//     main: TIngredient[];
//   };
//   orders: TOrdersData;
//   isLoading: boolean;
//   errors: string | null;
// };

// export const initialState: TDataState = {
//   ingredients: {
//     bun: [],
//     sauce: [],
//     main: []
//   },
//   orders: {
//     orders: [],
//     total: 0,
//     totalToday: 0
//   },
//   isLoading: false,
//   errors: null
// };

// export const getIngredients = createAsyncThunk('get/ingredients', async () =>
//   getIngredientsApi()
// );

// export const getOrders = createAsyncThunk('get/orders', async () =>
//   getFeedsApi()
// );

// export const StellarBurgerDataSlice = createSlice({
//   name: 'dataSlice',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIngredients.pending, (state) => {
//         state.isLoading = true;
//         state.errors = null;
//       })
//       .addCase(getIngredients.rejected, (state, action) => {
//         state.isLoading = false;
//         state.errors = action.error.message || 'Error loading ingredients';
//       })
//       .addCase(
//         getIngredients.fulfilled,
//         (state, action: PayloadAction<TIngredient[]>) => {
//           state.ingredients.bun = [];
//           state.ingredients.sauce = [];
//           state.ingredients.main = [];
//           state.isLoading = false;
//           state.errors = null;

//           action.payload.forEach((ingredient) => {
//             if (ingredient.type === 'bun') {
//               state.ingredients.bun.push(ingredient);
//             } else if (ingredient.type === 'sauce') {
//               state.ingredients.sauce.push(ingredient);
//             } else {
//               state.ingredients.main.push(ingredient);
//             }
//           });
//         }
//       )
//       .addCase(getOrders.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getOrders.rejected, (state, action) => {
//         state.isLoading = false;
//         state.errors = action.error.message || 'Error loading orders';
//       })
//       .addCase(
//         getOrders.fulfilled,
//         (state, action: PayloadAction<TOrdersData>) => {
//           state.errors = null;
//           state.orders.orders = action.payload.orders;
//           state.orders.total = action.payload.total;
//           state.orders.totalToday = action.payload.totalToday;
//           state.isLoading = false;
//         }
//       );
//   }
// });

// export const setIngredients = StellarBurgerDataSlice.actions;

import { getFeedsApi, getIngredientsApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrdersData } from '@utils-types';
// import { RootState } from '../../store';

export const getIngredients = createAsyncThunk('get/ingredients', async () =>
  getIngredientsApi()
);

export const getOrders = createAsyncThunk('get/orders', async () =>
  getFeedsApi()
);

export type TDataState = {
  ingredients: {
    bun: TIngredient[];
    sauce: TIngredient[];
    main: TIngredient[];
  };
  orders: TOrdersData;
  isLoading: boolean;
  errors: string | null;
};

export const initialState: TDataState = {
  ingredients: {
    bun: [],
    sauce: [],
    main: []
  },
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  errors: null
};

export const StellarBurgerDataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message!;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.errors = null;
          action.payload.forEach((ingredient) => {
            if (ingredient.type === 'bun') {
              state.ingredients.bun.push(ingredient);
            } else if (ingredient.type === 'sauce') {
              state.ingredients.sauce.push(ingredient);
            } else {
              state.ingredients.main.push(ingredient);
            }
          });
        }
      )
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message!;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.errors = null;
          state.orders.orders = action.payload.orders;
          state.orders.total = action.payload.total;
          state.orders.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const setIngredients = StellarBurgerDataSlice.actions;
