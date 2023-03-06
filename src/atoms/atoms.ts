import { atom } from 'jotai';
import { Account, User } from '../globalInterface';

export const userAtom = atom<User | null>(null);
export const accountsAtom = atom<Account[] | null>(null);
