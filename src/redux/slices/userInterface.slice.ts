/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SystemStateEnum } from '../../enums';
import { UserInterfaceInitialState } from '../interface';

const userInterfaceInitialState: UserInterfaceInitialState = {
  notification: {
    title: '',
    description: '',
    status: SystemStateEnum.Info,
    showNotification: false,
  },
  windowSize: 'Mobile',
  hasSignedOn: false,
};

export const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState: userInterfaceInitialState,
  reducers: {
    toggleSignedOn: (state) => {
      state.hasSignedOn = !state.hasSignedOn;
    },
    updateNotificationTitle: (state, action) => {
      state.notification.title = action.payload;
    },
    updateNotificationDescription: (state, action) => {
      state.notification.description = action.payload;
    },
    updateNotificationStatus: (state, action) => {
      state.notification.status = action.payload;
    },
    toggleNotification: (state) => {
      state.notification.showNotification = !state.notification.showNotification;
    },
    updateWindowSize: (state, action) => {
      state.windowSize = action.payload;
    },
  },
});

export const {
  updateNotificationTitle, updateNotificationDescription, updateNotificationStatus,
  toggleNotification, updateWindowSize, toggleSignedOn,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
