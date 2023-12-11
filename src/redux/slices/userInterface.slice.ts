/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userInterfaceInitialState = {
  loading: false,
  error: null,
};

export const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState: userInterfaceInitialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.message;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { toggleLoading, setError, clearError } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
