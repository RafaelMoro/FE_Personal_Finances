import { atom } from 'jotai';
import {
  AnyRecord,
} from '../globalInterface';

export const recordToBeModifiedAtom = atom<AnyRecord | null>(null);
