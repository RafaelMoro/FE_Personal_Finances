import { TYPE_OF_ACCOUNTS } from '../constants';

export type AccountType = typeof TYPE_OF_ACCOUNTS[number];
export type ErrorResponse = 'Network Error' | 'Other Error' | 'No error';
export type AccountAction = 'Create' | 'Modify';
export type WindowSizeValues = 'Mobile' | 'Tablet' | 'Desktop';
