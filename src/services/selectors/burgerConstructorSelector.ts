import { RootState } from '../store';

export const constructorStateSelector = (state: RootState) =>
  state.constructorSlice;
