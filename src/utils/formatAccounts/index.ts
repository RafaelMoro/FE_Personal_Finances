import { AccountUI, CreateAccount } from '../../components/UI/Account/Account.interface';
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

export const formatSingleAccount = (account: Account): AccountUI => {
  const formattedAccount: AccountUI = {
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
  return formattedAccount;
};

export const formatAccountsForLocalStorage = (account: CreateAccount): Account => {
  const newId = window.crypto.randomUUID();
  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  const __v = 0;
  const {
    title, amount, accountType, backgroundColor, color,
  } = account;
  const newAccount: Account = {
    _id: newId,
    __v,
    title,
    amount,
    accountType,
    backgroundColor,
    color,
  };
  return newAccount;
};
