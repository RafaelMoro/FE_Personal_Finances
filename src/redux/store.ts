import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/user.slice';
// import accountsReducer from './slices/accounts.slice';
import userInterfaceReducer from './slices/userInterface.slice';
import globalNotificationReducer from './slices/globalNotification.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    globalNotification: globalNotificationReducer,
    // accounts: accountsReducer,
    userInterface: userInterfaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
