import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'reg/user',
  async (data: TRegisterData) => {
    const userData = await registerUserApi(data);
    return userData;
  }
);

export const loginUser = createAsyncThunk(
  'login/user',
  async (data: TLoginData) => {
    const userData = await loginUserApi(data);
    return userData;
  }
);

export const getUser = createAsyncThunk('get/user', async () => {
  const userData = await getUserApi();
  return userData;
});

export const logoutUser = createAsyncThunk('logout/user', async () => {
  await logoutApi();
});

export const updateUserData = createAsyncThunk(
  'update/user',
  async (data: TRegisterData) => {
    const userData = await updateUserApi(data);
    return userData;
  }
);

export type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  request: boolean;
  error: string | null;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  request: false,
  error: null
};

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message!;
        state.isAuthChecked = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
        }
      )

      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message!;
        state.isAuthChecked = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
        }
      )

      .addCase(logoutUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message!;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.request = false;
        state.error = null;
        deleteCookie('accessToken');
      })

      .addCase(getUser.pending, (state) => {
        state.request = true;
        state.error = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message!;
        state.isAuthChecked = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.request = false;
          state.error = null;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )

      .addCase(updateUserData.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message!;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.request = false;
          state.error = null;
          state.user = action.payload.user;
        }
      );
  }
});

export default AuthSlice.reducer;
