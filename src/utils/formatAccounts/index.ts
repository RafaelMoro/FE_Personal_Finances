import { AccountUI } from '../../components/UI/Account/interface';
import { Account } from '../../globalInterface';
import { findColor } from '../FindColor';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

interface FormatAccountsProps {
  accounts: Account [];
  selectedAccountId?: string | null;
}

export const formatAccounts = ({
  accounts, selectedAccountId = null,
}: FormatAccountsProps): AccountUI [] => {
  if (selectedAccountId) {
    return accounts.map((account) => {
      if (account._id === selectedAccountId) {
        return {
          ...account,
          amountFormatted: formatNumberToCurrency(account.amount),
          selected: true,
          backgroundColorUI: findColor({
            colorName: account.backgroundColor,
          }),
          colorUI: findColor({
            colorName: account.color, findTextColor: true,
          }),
        };
      }
      return {
        ...account,
        amountFormatted: formatNumberToCurrency(account.amount),
        selected: false,
        backgroundColorUI: findColor({
          colorName: account.backgroundColor,
        }),
        colorUI: findColor({
          colorName: account.color, findTextColor: true,
        }),
      };
    });
  }

  return accounts.map((account, index) => {
    if (index === 0) {
      return {
        ...account,
        amountFormatted: formatNumberToCurrency(account.amount),
        selected: true,
        backgroundColorUI: findColor({
          colorName: account.backgroundColor,
        }),
        colorUI: findColor({
          colorName: account.color, findTextColor: true,
        }),
      };
    }

    return {
      ...account,
      amountFormatted: formatNumberToCurrency(account.amount),
      selected: false,
      backgroundColorUI: findColor({
        colorName: account.backgroundColor,
      }),
      colorUI: findColor({
        colorName: account.color, findTextColor: true,
      }),
    };
  });
};
