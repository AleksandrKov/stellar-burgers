import {
  AuthSlice,
  initialState,
  // getUser,
  loginUser,
  registerUser,
  updateUserData
} from './authUserSlice';

import { userRegistratedTest, userLoginTest } from './testData';

describe('Проверка слайса авторизации пользователя', () => {
  let currentState;

  beforeEach(() => {
    currentState = { ...initialState };
  });

  it('состояние pending регистрации пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      registerUser.pending('', userRegistratedTest)
    );

    expect(currentState.isAuthChecked).toBeFalsy();
    expect(currentState.user).toBeNull;
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled регистрации пользователя', () => {
    const testData = {
      success: true,
      user: userRegistratedTest,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      registerUser.fulfilled(testData, '', userRegistratedTest)
    );

    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected регистрации пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      registerUser.rejected(error, 'testError', userRegistratedTest)
    );

    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });

  it('состояние pending авторизации пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      loginUser.pending('', userLoginTest)
    );

    expect(currentState.isAuthChecked).toBeFalsy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled авторизации пользователя', () => {
    const testData = {
      success: true,
      user: { ...userLoginTest, name: 'name' },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      loginUser.fulfilled(testData, '', userLoginTest)
    );

    expect(currentState.error).toBeNull();
    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected авторизации пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      loginUser.rejected(error, 'testError', userLoginTest)
    );

    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });

  it('состояние pending обновления данных пользователя', () => {
    const currentState = AuthSlice.reducer(
      initialState,
      updateUserData.pending('', userRegistratedTest)
    );

    expect(currentState.isAuthChecked).toBeFalsy();
    expect(currentState.error).toBeNull();
  });

  it('состояние fulfilled обновления данных пользователя', () => {
    const testData = {
      success: true,
      user: userRegistratedTest
    };

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      updateUserData.fulfilled(testData, '', userRegistratedTest)
    );

    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.error).toBeNull();
    expect(currentState.user).toEqual(testData.user);
  });

  it('состояние rejected обновления данных пользователя', () => {
    const error = new Error('testError');

    const currentState = AuthSlice.reducer(
      { ...initialState, isAuthChecked: true },
      updateUserData.rejected(error, '', userRegistratedTest)
    );

    expect(currentState.isAuthChecked).toBeTruthy();
    expect(currentState.user).toBeNull();
    expect(currentState.error).toBe(error.message);
  });
});
