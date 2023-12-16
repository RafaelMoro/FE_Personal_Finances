import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/user.slice';
import accountsReducer from './slices/Accounts/accounts.slice';
import userInterfaceReducer from './slices/userInterface.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountsReducer,
    userInterface: userInterfaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
