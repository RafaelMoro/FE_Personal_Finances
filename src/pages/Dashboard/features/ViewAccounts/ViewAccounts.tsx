import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import {
  Account, AddAccount, Error, AccountLoading,
} from '../../../../components/UI';
import { SelectAccountDialog } from '../SelectAccountDialog';
import { userAtom } from '../../../../atoms';
import { GetRequest } from '../../../../utils';
import { GET_ACCOUNTS_ROUTE } from './constants';
import { IAccount } from '../../../../components/UI/Account/interface';
import { ErrorResponse } from './interface';
import {
  AccountSection, AccountsTitle, ChangeAccountButton,
  AccountsContainer, AccountSectionError, AccountSectionLoading,
} from './ViewAccounts.styled';

let ERROR_TITLE = 'Error.';
let ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';
const NETWORK_CATCH_ERROR = 'Network Error';

const ViewAccounts = () => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [accounts, setAccounts] = useState<IAccount [] | null>(null);
  const [error, setError] = useState<ErrorResponse>('No error');
  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accountsData = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);

        // catch error
        if (accountsData?.error) {
          const errorMessage = accountsData?.message as string;
          if (errorMessage === NETWORK_CATCH_ERROR) {
            ERROR_TITLE = 'Error #401';
            setError('Network Error');
            return;
          }
          ERROR_DESCRIPTION = errorMessage;
          setError('Other Error');
          return;
        }
        setAccounts(accountsData);

        // accounts array is empty, show add account component
        if (accountsData.length === 0) {
          setShowAddAccount(true);
          return;
        }
        setSelectedAccount(accountsData[0]);
      } catch (errorCatched) {
        const newError = errorCatched as AxiosError;
        ERROR_DESCRIPTION = newError.message;
        setError('Other Error');
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

  if (accounts === null && error === 'No error') {
    return (
      <AccountSectionLoading>
        <AccountLoading />
      </AccountSectionLoading>
    );
  }

  if (error !== 'No error') {
    return (
      <AccountSectionError>
        <Error title={ERROR_TITLE} description={ERROR_DESCRIPTION} />
      </AccountSectionError>
    );
  }

  return (
    <AccountSection>
      <AccountsTitle>Account: </AccountsTitle>
      { selectedAccount && (
        <ChangeAccountButton variant="contained" size="medium" onClick={handleClickOpen}>Change account</ChangeAccountButton>
      )}
      <AccountsContainer>
        { selectedAccount && (
          <Account
            _id={selectedAccount._id}
            title={selectedAccount.title}
            amount={selectedAccount.amount}
            accountType={selectedAccount.accountType}
            backgroundColor={selectedAccount.backgroundColor}
            color={selectedAccount?.color ?? 'white'}
            selected
          />
        )}
        { (showAddAccount && !selectedAccount) && (
          <AddAccount />
        ) }
      </AccountsContainer>
      { selectedAccount && (
        <SelectAccountDialog
          accounts={accounts as IAccount[]}
          selectedAccount={selectedAccount}
          open={openAccountModal}
          onClose={handleClickClose}
        />
      )}
    </AccountSection>
  );
};

export { ViewAccounts };
