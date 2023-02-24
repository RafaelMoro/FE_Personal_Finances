import { AccountBackgroundColorsKeys } from '../../../styles/interface';

export type AccountType = 'Debit' | 'Credit' | 'Food Voucher' | 'Restaurant Voucher' | 'Savings';

export interface IAccount {
  _id: string;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: AccountBackgroundColorsKeys;
  color?: string;
  selected?: boolean;
}

export interface IAccountDynamicStylesProps {
  backgroundColor: string;
  color?: string;
  selected: boolean;
}
