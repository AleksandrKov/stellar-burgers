import {
  BurgerConstructorSlice,
  addToConstructor,
  clearConstructorState,
  initialState,
  rebuildOrder,
  removeFromConstructor
} from './burgerConstructorSlice';
import { ingredientsTest } from './testData';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'testID')
}));

describe('Тест слайса конструктора бургеров', () => {
  it('обработка экшена добавления ингредиента;', () => {
    const currentState = BurgerConstructorSlice.reducer(
      initialState,
      addToConstructor(ingredientsTest[1])
    );

    expect(currentState.ingredients.length).toBe(1);
    expect(currentState.ingredients[0]).toEqual({
      ...ingredientsTest[1],
      id: 'testID'
    });
  });

  it('обработка экшена удаления ингредиента', () => {
    const testState = {
      ...initialState,
      ingredients: [
        { ...ingredientsTest[1], id: 'ID' },
        { ...ingredientsTest[2], id: 'anotherID' }
      ]
    };

    const currentState = BurgerConstructorSlice.reducer(
      testState,
      removeFromConstructor(testState.ingredients[1])
    );

    expect(currentState.ingredients.length).toBe(1);
    expect(currentState.ingredients[0]).toEqual({
      ...ingredientsTest[1],
      id: 'ID'
    });
  });

  const testState = {
    bun: { ...ingredientsTest[0], id: '1' },
    ingredients: [
      { ...ingredientsTest[1], id: '2' },
      { ...ingredientsTest[2], id: '3' }
    ]
  };

  it('обработка экшена изменения порядка ингредиентов в начинке', () => {
    const currentState = BurgerConstructorSlice.reducer(
      testState,
      rebuildOrder({ from: 1, to: 0 })
    );

    expect(currentState.ingredients[0].id).toBe('3');
    expect(currentState.ingredients[1].id).toBe('2');
  });

  it('Очистка конструктора', () => {
    const currentState = BurgerConstructorSlice.reducer(
      testState,
      clearConstructorState()
    );

    expect(currentState).toEqual(initialState);
  });
});
