/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { FORGOT_PASSWORD_POST_ROUTE } from '../../../../pages/LoginModule/ForgotPassword/constants';
import { GeneralResponse } from '../../../../globalInterface';
import { ForgotPasswordValues } from '../../../../pages/LoginModule/ForgotPassword/interface';
import { postRequest } from '../../../../utils';
import { UserInitialState } from '../interface';

export const forgotPasswordThunkFn = createAsyncThunk(
  'user/forgotPassword',
  async (values: ForgotPasswordValues) => {
    const response: GeneralResponse = await postRequest(
      values,
      FORGOT_PASSWORD_POST_ROUTE,
    );
    return response;
  },
);

export const forgotPasswordPending = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(forgotPasswordThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
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
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
