import { atom } from 'jotai';
import { AccountUI } from '../components/UI/Account/interface';
import { WindowSizeValues, ModalAction } from '../aliasType';
import {
  Account, User, AllRecords, GlobalNotification,
} from '../globalInterface';
import { SystemStateEnum } from '../enums';

/** User atoms  */
export const userAtom = atom<User | null>(null);

/** Account atoms  */
export const accountsAtom = atom<Account[] | null>(null);
export const accountsUIAtom = atom<AccountUI[]>([]);
export const selectedAccountAtom = atom<AccountUI | null>(null);
export const openAccountModalAtom = atom<boolean>(false);
export const openChangeAccountModalAtom = atom<boolean>(false);
export const accountActionAtom = atom<ModalAction>('Create');

/** Records atoms  */
export const allRecordsAtom = atom<AllRecords>({ currentMonth: [], lastMonth: [], olderRecords: [] });

/** Window size atom  */
export const windowSizeAtom = atom<WindowSizeValues>('Mobile');

/** Account atoms  */
export const globalNotificationAtom = atom<GlobalNotification>({
  title: '',
  description: '',
  status: SystemStateEnum.Info,
  showNotification: false,
});
