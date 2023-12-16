/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SystemStateEnum } from '../../enums';
import { GlobalNotification } from '../../globalInterface';
import { WindowSizeValues } from '../../aliasType';

interface UserInterfaceInitialState {
  notification: GlobalNotification;
  windowSize: WindowSizeValues;
}

const userInterfaceInitialState: UserInterfaceInitialState = {
  notification: {
    title: '',
    description: '',
    status: SystemStateEnum.Info,
    showNotification: false,
  },
  windowSize: 'Mobile',
};

export const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState: userInterfaceInitialState,
  reducers: {
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
  },
});

export const {
  updateNotificationTitle, updateNotificationDescription, updateNotificationStatus,
  toggleNotification,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
