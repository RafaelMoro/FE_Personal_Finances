import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { Account } from '../../../../components/UI';
import { IAccount } from '../../../../components/UI/Account/interface';
import {
  AccountSection, AccountsTitle, ChangeAccountButton, AccountsContainer,
} from './ViewAccounts.styled';
import { SelectAccountDialog } from '../SelectAccountDialog';

import { userAtom } from '../../../../atoms';
import { GetRequest } from '../../../../utils';
import { GET_ACCOUNTS_ROUTE } from './constants';

const mockedAccounts: IAccount[] = [
  {
    id: '1',
    title: 'Zero',
    amount: 7500,
    accountType: 'Credit',
    bgColor: 'grey',
  },
  {
    id: '2',
    title: '2now',
    amount: 15000,
    accountType: 'Credit',
    bgColor: 'black',
  },
  {
    id: '3',
    title: 'Santander',
    amount: 678,
    accountType: 'Debit',
    bgColor: 'darkRed',
  },
  {
    id: '4',
    title: 'BBVA',
    amount: 3700,
    accountType: 'Savings',
    bgColor: 'azure',
    color: 'black',
  },
];

const ViewAccounts = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [accounts, setAccounts] = useState<IAccount [] | null>(null);
  // eslint-disable-next-line no-console
  console.log(accounts);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(mockedAccounts[0]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accountsData = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);
        if (accountsData?.error) {
          const error = accountsData?.message as string;
          // eslint-disable-next-line no-console
          console.log(error);
          return;
        }
        setAccounts(accountsData);
      } catch (errorCatched) {
        const error = errorCatched as AxiosError;
        // eslint-disable-next-line no-console
        console.log(error.response?.data);
      }
    };
    if (user && bearerToken) getAccounts();
  }, [bearerToken, user]);

  const handleClickOpen = () => {
    setOpenAccountModal(true);
  };

  const handleClickClose = (account: IAccount) => {
    setOpenAccountModal(false);
    setSelectedAccount(account);
  };

  return (
    <AccountSection>
      <AccountsTitle>Account: </AccountsTitle>
      <ChangeAccountButton variant="contained" size="medium" onClick={handleClickOpen}>Change account</ChangeAccountButton>
      <AccountsContainer>
        <Account
          id={selectedAccount.id}
          title={selectedAccount.title}
          amount={selectedAccount.amount}
          accountType={selectedAccount.accountType}
          bgColor={selectedAccount.bgColor}
          color={selectedAccount?.color ?? 'white'}
          selected
        />
      </AccountsContainer>
      <SelectAccountDialog
        accounts={mockedAccounts}
        selectedAccount={selectedAccount}
        open={openAccountModal}
        onClose={handleClickClose}
      />
    </AccountSection>
  );
};

export { ViewAccounts };
