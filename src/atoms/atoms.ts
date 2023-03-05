import { atom } from 'jotai';
import { SystemStateEnum } from '../enums';
import { IAccount, IGlobalNotification, IUser } from '../globalInterface';

export const userAtom = atom<IUser | null>(null);
export const accountsAtom = atom<IAccount[] | null>(null);
export const globalNotificationAtom = atom<IGlobalNotification>({
  title: '',
  description: '',
  status: SystemStateEnum.Success,
});
