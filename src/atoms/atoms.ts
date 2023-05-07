import { atom } from 'jotai';
import { AccountUI } from '../components/UI/Account/interface';
import { WindowSizeValues } from '../aliasType';
import { Account, User } from '../globalInterface';

export const userAtom = atom<User | null>(null);
export const accountsAtom = atom<Account[] | null>(null);
export const accountsUIAtom = atom<AccountUI[]>([]);
export const selectedAccountAtom = atom<AccountUI | null>(null);
export const windowSizeAtom = atom<WindowSizeValues>('Mobile');
