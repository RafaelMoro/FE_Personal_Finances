import { IAccount } from '../../interface';

export interface AccountDialogProps {
  open: boolean;
  selectedAccount: IAccount;
  accounts: IAccount[];
  onClose: (selectedAccount: IAccount) => void;
}

export interface IListAccountDynamicStylesProps {
  showSelectedAccount?: boolean;
}
