import { atom } from 'jotai';
import { IUser } from './interface';

export const userAtom = atom<IUser | null>(null);
export const showNotificationAtom = atom<boolean>(false);
