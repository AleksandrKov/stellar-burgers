import { RootState } from '../store';

export const selectIsAuthChecked = (state: RootState) =>
  state.authSlice.isAuthChecked;
export const selectUser = (state: RootState) => state.authSlice.user;
export const selectIsRequest = (state: RootState) => state.authSlice.request;
