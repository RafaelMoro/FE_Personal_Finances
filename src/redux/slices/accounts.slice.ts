// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setError, toggleLoading } from './userInterface.slice';
// import { GetRequest } from '../../utils';
// import { GET_ACCOUNTS_ROUTE } from '../../components/UI/Account/features/ViewAccounts/constants';

// const accountsInitialState = {
//   accounts: [],
// };

// export const fetchAccounts = createAsyncThunk(
//   'accounts/fetchAccounts',
//   async (_, { dispatch }) => {
//     try {
//       dispatch(toggleLoading());
//       const response = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);
//     } catch (err) {
//       console.warn(err);
//     }
//   }
// );

// export const accountsSlice = createSlice({
//   name: 'accounts',
//   initialState: accountsInitialState,
//   reducers: {
//     createAccounts: (state, action) => {
//       state.accounts = [...state.accounts, action.payload];
//     },
//   },
// });

// export const { createAccounts } = accountsSlice.actions;
// export default accountsSlice.reducer;
export {};
