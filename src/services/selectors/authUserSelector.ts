import { RootState } from '../store';

export const selectUser = (state: RootState) => state.authSlice.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.authSlice.isAuthChecked;
export const selectIsRequest = (state: RootState) => state.authSlice.request;
export const selectAuthError = (state: RootState) => state.authSlice.error;
