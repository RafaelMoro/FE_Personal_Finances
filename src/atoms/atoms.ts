import { atom } from 'jotai';
import { AccountUI } from '../components/UI/Account/interface';
import { WindowSizeValues, AccountAction } from '../aliasType';
import { Account, User, SelectInputValueProps } from '../globalInterface';
import { AnyRecord } from '../components/UI/Records/interface';

export const userAtom = atom<User | null>(null);
export const accountsAtom = atom<Account[] | null>(null);
export const accountsUIAtom = atom<AccountUI[]>([]);
export const selectedAccountAtom = atom<AccountUI | null>(null);
export const openAccountModalAtom = atom<boolean>(false);
export const openChangeAccountModalAtom = atom<boolean>(false);
export const accountActionAtom = atom<AccountAction>('Create');
export const allRecordsAtom = atom<AnyRecord[]>([]);
export const windowSizeAtom = atom<WindowSizeValues>('Mobile');
export const selectInputInfoAtom = atom<SelectInputValueProps>({
  name: '',
  value: '',
});
