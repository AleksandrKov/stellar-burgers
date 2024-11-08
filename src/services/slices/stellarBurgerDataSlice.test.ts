import {
  StellarBurgerDataSlice,
  getIngredients,
  getOrders,
  initialState
} from './stellarBurgerDataSlice';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import { ingredientsTest, ordersTodayTest } from './testData';

fetchMock.enableMocks();

describe('Тест слайса плучения данных', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        dataSlice: StellarBurgerDataSlice.reducer
      }
    });
  });

  it('должен установить isLoading при вызове getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.errors).toBeNull();
  });

  it('должен установить ошибки при вызове getIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(errorMessage);
  });

  it('должен обновить ингредиенты при вызове getIngredients.fulfilled', () => {
    const mockIngredients = ingredientsTest;
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBeNull();
    expect(state.ingredients.bun).toEqual([mockIngredients[0]]);
    expect(state.ingredients.sauce).toEqual([mockIngredients[1]]);
    expect(state.ingredients.main).toEqual([mockIngredients[2]]);
  });

  it('должен установить isLoading при вызове getOrders.pending', () => {
    const action = { type: getOrders.pending.type };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен установить ошибки при вызове getOrders.rejected', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const action = {
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(errorMessage);
  });

  it('должен обновить заказы при вызове getOrders.fulfilled', () => {
    const mockOrdersData = ordersTodayTest;

    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrdersData
    };
    const state = StellarBurgerDataSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBeNull();
    expect(state.orders.orders).toEqual(mockOrdersData.orders);
    expect(state.orders.total).toBe(mockOrdersData.total);
    expect(state.orders.totalToday).toBe(mockOrdersData.totalToday);
  });
});
