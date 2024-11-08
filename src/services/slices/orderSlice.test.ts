import { OrderSlice, initialState, makeAnOrder } from './orderSlice';

import { orderIngredientsTest, orderTest } from './testData';

describe('Тест слайса отправки заказа', () => {
  it('состояние pending отправки заказа', () => {
    const currentState = OrderSlice.reducer(
      initialState,
      makeAnOrder.pending('', [])
    );

    expect(currentState.orderRequest).toBeTruthy();
    expect(currentState.error).toBeNull();
    expect(currentState.order).toBeNull();
  });

  it('состояние fulfilled отправки заказа', () => {
    const currentState = OrderSlice.reducer(
      { ...initialState, orderRequest: true },
      makeAnOrder.fulfilled(orderTest, '', orderIngredientsTest)
    );

    expect(currentState.orderRequest).toBeFalsy();
    expect(currentState.order?._id).toBe('1');
    expect(currentState.order?.ingredients.length).toBe(
      orderIngredientsTest.length
    );
  });

  it('состояние rejected отправки заказа', () => {
    const error = new Error('testError');
    const currentState = OrderSlice.reducer(
      { ...initialState, orderRequest: true },
      makeAnOrder.rejected(error, '', orderIngredientsTest)
    );

    expect(currentState.order).toBeNull();
    expect(currentState.orderRequest).toBeFalsy();
    expect(currentState.error).toBe(error.message);
  });
});
