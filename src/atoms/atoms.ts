import { atom } from 'jotai';
import {
  RecordsTotal, AnyRecord,
} from '../globalInterface';

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
export const recordToBeModifiedAtom = atom<AnyRecord | null>(null);
export const totalAtom = atom<RecordsTotal>(initialTotalAtomState);
