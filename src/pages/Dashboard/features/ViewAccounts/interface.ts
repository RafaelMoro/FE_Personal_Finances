import { IAccount } from '../../../../components/UI/Account/interface';

export interface IViewAccountsProps {
  selectedAccount: IAccount;
  handleClickOpen: () => void;
}
