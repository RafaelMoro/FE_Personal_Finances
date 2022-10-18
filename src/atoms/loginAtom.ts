import { atom } from 'jotai';
import { IUserAtom } from './interface';

export const userAtom = atom<IUserAtom | null>(null);
