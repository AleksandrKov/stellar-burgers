import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';

export type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  error: null
};

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearAuthTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const checkUser = createAsyncThunk('auth/checkAuth', async () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!accessToken && !refreshToken) {
    return null;
  }

  const response = await getUserApi();
  return response.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(registerData);
      setAuthTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(loginData);
      setAuthTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  const response = await logoutApi();
  if (response.success) {
    clearAuthTokens();
  }
});

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectIsAuthChecked: (state: TAuthState) => state.isAuthChecked,
    selectUser: (state: TAuthState) => state.user,
    selectLoginError: (state: TAuthState) => state.error
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message || 'check user auth failed';
        state.isAuthChecked = true;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;

        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;

        state.error =
          (action.payload as string) ||
          (action.error.message as string) ||
          'Unknown error';
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;

        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;

        state.error =
          (action.payload as string) ||
          (action.error.message as string) ||
          'Unknown error';
      })

      .addCase(updateUserData.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error =
          (action.payload as string) ||
          (action.error.message as string) ||
          'Unknown error';
      })

      .addCase(fetchLogout.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message || 'logout failed';
        state.isAuthChecked = true;
      });
  }
});

// export const { logoutUser } = AuthSlice.actions;
export const { setAuthChecked, setUser } = AuthSlice.actions;
export const { selectIsAuthChecked, selectUser, selectLoginError } =
  AuthSlice.selectors;
export default AuthSlice;
