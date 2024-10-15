import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

function moveItemInArray<T>(array: T[], from: number, to: number): T[] {
  const result = [...array];
  result.splice(to, 0, result.splice(from, 1)[0]);
  return result;
}

export const BurgerConstructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addToConstructor: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    removeFromConstructor: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload.id
      );
    },
    rebuildOrder: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      state.ingredients = moveItemInArray(
        state.ingredients,
        payload.from,
        payload.to
      );
    },
    clearConstructorState: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    }
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  rebuildOrder,
  clearConstructorState
} = BurgerConstructorSlice.actions;
