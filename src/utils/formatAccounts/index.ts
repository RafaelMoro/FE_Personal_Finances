import { AccountUI } from '../../components/UI/Account/interface';
import { Account } from '../../globalInterface';
import { findColor } from '../FindColor';
import { formatValueToCurrency } from '../FormatNumberToCurrency';

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
          amountFormatted: formatValueToCurrency({ amount: account.amount }),
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
        amountFormatted: formatValueToCurrency({ amount: account.amount }),
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
    // ommitting sub as when we create an account, the backend returns sub
    const { sub, ...rest } = account;
    if (index === 0) {
      return {
        ...rest,
        amountFormatted: formatValueToCurrency({ amount: account.amount }),
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
      ...rest,
      amountFormatted: formatValueToCurrency({ amount: account.amount }),
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
