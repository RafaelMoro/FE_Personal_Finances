/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SystemStateEnum } from '../../enums';
import { GlobalNotification } from '../../globalInterface';

const globalNotificationInitialState: GlobalNotification = {
  title: '',
  description: '',
  status: SystemStateEnum.Info,
  showNotification: false,
};

export const globalNotificationSlice = createSlice({
  name: 'globalNotification',
  initialState: globalNotificationInitialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleNotification: (state) => {
      state.showNotification = !state.showNotification;
    },
  },
});

export const {
  updateTitle, updateDescription, updateStatus, toggleNotification,
} = globalNotificationSlice.actions;

export default globalNotificationSlice.reducer;
