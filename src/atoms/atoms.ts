import { atom } from 'jotai';
import { IUser } from '../globalInterface';

export const userAtom = atom<IUser | null>(null);
