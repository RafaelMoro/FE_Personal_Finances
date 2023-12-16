import { atom } from 'jotai';
import {
  User, AllRecords, RecordsTotal, AnyRecord,
} from '../globalInterface';

/** User atoms  */
export const userAtom = atom<User | null>(null);

/** Records atoms  */
export const initialStateAllRecords = {
  currentMonth: [],
  lastMonth: [],
  olderRecords: [],
};
export const initialTotalAtomState = {
  currentMonth: {
    expenseTotal: '$0.00',
    incomeTotal: '$0.00',
  },
  lastMonth: {
    expenseTotal: '$0.00',
    incomeTotal: '$0.00',
  },
};
export const allRecordsAtom = atom<AllRecords>(initialStateAllRecords);
export const recordToBeModifiedAtom = atom<AnyRecord | null>(null);
export const totalAtom = atom<RecordsTotal>(initialTotalAtomState);
