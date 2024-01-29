/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest, updateLocalStorage } from '../../../utils';
import { LoginValues } from '../../../pages/LoginModule/Login/interface';
import { User } from '../../../globalInterface';
import { LOGIN_POST_ROUTE } from '../../../pages/LoginModule/Login/constants';
import { LoginResponse, UserInitialState } from './interface';
import { forgotPasswordFulfilled, forgotPasswordPending, forgotPasswordRejected } from './actions/forgotPassword';

const userInitialState: UserInitialState = {
  userInfo: null,
  loading: false,
  loadingOnAction: false,
  successOnAction: false,
  error: false,
  errorOnAction: false,
  errorMessage: '',
  errorMessageOnAction: '',
  navigateToDashboard: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (values: LoginValues) => {
    const loginResponse: LoginResponse = await postRequest(values, LOGIN_POST_ROUTE);
    return loginResponse;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    toggleNavigateDashboardFlag: (state) => {
      state.navigateToDashboard = !state.navigateToDashboard;
    },
    signOff: (state) => {
      state.userInfo = null;
    },
    signOn: (state, action) => {
      state.userInfo = action.payload;
    },
    resetSuccessOnAction: (state) => {
      state.successOnAction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;

      // Reset previous error status if it occurred
      state.error = false;
      state.errorMessage = '';
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const { accessToken, user: { email } } = action.payload.data;
      const bearerToken = { Authorization: `Bearer ${accessToken}` };
      const user: User = { accessToken, email, bearerToken };
      updateLocalStorage(
        {
          user,
        },
      );
      state.userInfo = user;
      state.navigateToDashboard = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });

    forgotPasswordPending(builder);
    forgotPasswordFulfilled(builder);
    forgotPasswordRejected(builder);
  },
});

export const {
  toggleNavigateDashboardFlag, signOff, signOn, resetSuccessOnAction,
} = userSlice.actions;

export default userSlice.reducer;
