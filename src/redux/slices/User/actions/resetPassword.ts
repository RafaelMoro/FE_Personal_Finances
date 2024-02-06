/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../../../utils';
import { ResetPasswordThunkProps, UserInitialState } from '../interface';

export const resetPasswordThunkFn = createAsyncThunk(
  'user/resetPassword',
  async ({ values, route }: ResetPasswordThunkProps) => {
    const standardResponse = await postRequest(values, route);
    return standardResponse?.data;
  },
);

export const resetPasswordPending = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(resetPasswordThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.successOnAction = false;
  state.errorMessageOnAction = '';
});

export const resetPasswordFulfilled = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(resetPasswordThunkFn.fulfilled, (state) => {
  state.loadingOnAction = false;

  state.successOnAction = true;
});

export const resetPasswordRejected = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(resetPasswordThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.successOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error;
});
