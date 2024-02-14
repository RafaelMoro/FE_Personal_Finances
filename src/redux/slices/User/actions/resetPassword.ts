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

  // Reset previous error status if it occurred
});

export const resetPasswordFulfilled = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(resetPasswordThunkFn.fulfilled, (state) => {
});

export const resetPasswordRejected = (
  builder: ActionReducerMapBuilder<UserInitialState>,
) => builder.addCase(resetPasswordThunkFn.rejected, (state, action) => {
});
