import { atom } from 'jotai';
import { IUser } from './interface';

export const userAtom = atom<IUser | null>(null);
