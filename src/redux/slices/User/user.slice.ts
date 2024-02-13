/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserInitialState } from './interface';

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

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
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
});

export const {
  signOff, signOn, resetSuccessOnAction,
} = userSlice.actions;

export default userSlice.reducer;
