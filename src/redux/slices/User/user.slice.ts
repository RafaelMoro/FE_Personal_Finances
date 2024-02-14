/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserInitialState } from './interface';

const userInitialState: UserInitialState = {
  userInfo: null,
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
  },
});

export const {
  signOff, signOn,
} = userSlice.actions;

export default userSlice.reducer;
