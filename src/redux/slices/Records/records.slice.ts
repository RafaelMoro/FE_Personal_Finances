import { createSlice } from '@reduxjs/toolkit';
import { ZERO_CURRENCY } from '../../../constants';
import { RecordsInitialState } from './interface';
import { fetchCurrentMonthRecordsFullfilled, fetchCurrentMonthRecordsPending, fetchCurrentMonthRecordsRejected } from './actions/fetchRecords';
import { fetchLastMonthRecordsFullfilled, fetchLastMonthRecordsPending, fetchLastMonthRecordsRejected } from './actions/fetchLastMonthRecords';

const recordsInitialState: RecordsInitialState = {
  loading: false,
  error: false,
  errorMessage: '',
  loadingOnAction: false,
  errorOnAction: false,
  errorMessageOnAction: '',
  allRecords: {
    currentMonth: [],
    lastMonth: [],
    olderRecords: [],
  },
  totalRecords: {
    currentMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
    lastMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
  },
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState: recordsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchCurrentMonthRecordsPending(builder);
    fetchCurrentMonthRecordsRejected(builder);
    fetchCurrentMonthRecordsFullfilled(builder);

    fetchLastMonthRecordsFullfilled(builder);
    fetchLastMonthRecordsPending(builder);
    fetchLastMonthRecordsRejected(builder);
  },
});

export default recordsSlice.reducer;
