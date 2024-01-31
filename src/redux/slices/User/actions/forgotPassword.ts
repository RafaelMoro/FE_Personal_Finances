/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FORGOT_PASSWORD_POST_ROUTE } from '../../../../pages/LoginModule/ForgotPassword/constants';
import { GeneralResponse } from '../../../../globalInterface';
import { ForgotPasswordValues } from '../../../../pages/LoginModule/ForgotPassword/interface';
import { UserInitialState } from '../interface';
import { BACKEND_URI } from '../../../../constants';

export const forgotPasswordThunkFn = createAsyncThunk(
  'user/forgotPassword',
  async (values: ForgotPasswordValues) => {
    const standardResponse = await axios.post<GeneralResponse>(`${BACKEND_URI}/${FORGOT_PASSWORD_POST_ROUTE}`, values);
    return standardResponse?.data;
  },
);

export const forgotPasswordPending = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(forgotPasswordThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.successOnAction = false;
  state.errorMessageOnAction = '';
});

export const forgotPasswordFulfilled = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(forgotPasswordThunkFn.fulfilled, (state) => {
  state.loadingOnAction = false;

  state.successOnAction = true;
});

export const forgotPasswordRejected = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(forgotPasswordThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.successOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error;
});
