/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toggleLoading } from '../userInterface.slice';
import { postRequest, updateLocalStorage } from '../../../utils';
import { LoginValues } from '../../../pages/LoginModule/Login/interface';
import { User } from '../../../globalInterface';
import { LOGIN_POST_ROUTE } from '../../../pages/LoginModule/Login/constants';
import { LoginInfoResponse, UserInitialState } from './interface';

const userInitialState: UserInitialState = {
  userInfo: null,
  loading: false,
  error: false,
  errorMessage: '',
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (values: LoginValues, { dispatch }) => {
    dispatch(toggleLoading());
    const loginInfo: LoginInfoResponse = await postRequest(values, LOGIN_POST_ROUTE);
    return loginInfo;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;

      // Reset previous error status if it occurred
      state.error = false;
      state.errorMessage = '';
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const { accessToken, user: { email } } = action.payload;
      const bearerToken = { Authorization: `Bearer ${accessToken}` };
      const user: User = { accessToken, email, bearerToken };
      updateLocalStorage(
        {
          user,
        },
      );
      state.userInfo = user;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
