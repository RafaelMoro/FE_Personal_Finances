import { atom } from 'jotai';
import { IAccount, IUser } from '../globalInterface';

export const userAtom = atom<IUser | null>(null);
export const accountsAtom = atom<IAccount[] | null>(null);
