export type AccountType = 'Debit' | 'Credit' | 'Food Voucher' | 'Restaurant Voucher' | 'Savings';

export interface IAccountProps {
  title: string;
  amount: number;
  accountType: AccountType;
  bgColor: string;
  color?: string;
  selected?: boolean;
  loading?: boolean;
}

export interface IAccountDynamicStylesProps {
  bgColor: string;
  color?: string;
  selected: boolean;
  loading?: boolean;
}
