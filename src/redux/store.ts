import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/user.slice';
import accountsReducer from './slices/Accounts/accounts.slice';
import userInterfaceReducer from './slices/userInterface.slice';
import recordsReducer from './slices/Records/records.slice';
import categoriesReducer from './slices/Categories/categories.slice';
import { budgetMasterApi } from './budgetMaster.api';

export const store = configureStore({
  reducer: {
    [budgetMasterApi.reducerPath]: budgetMasterApi.reducer,
    user: userReducer,
    accounts: accountsReducer,
    records: recordsReducer,
    categories: categoriesReducer,
    userInterface: userInterfaceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(budgetMasterApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
