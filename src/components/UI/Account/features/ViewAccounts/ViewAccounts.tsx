import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { Error } from '../../../Error';
import { Account } from '../../Account';
import { AccountLoading } from '../AccountLoading';
import { AddAccount } from '../AddAccount';
import { AccountDialog } from '../AccountDialog';
import { DeleteAccountDialog } from '../DeleteAccountDialog';
import { SelectAccountDialog } from '../SelectAccountDialog';
import {
  userAtom, accountsAtom, selectedAccountAtom, accountsUIAtom, windowSizeAtom,
} from '../../../../../atoms';
import { GetRequest, formatAccounts } from '../../../../../utils';
import { GET_ACCOUNTS_ROUTE } from './constants';
import { AccountUI } from '../../interface';
import { IViewAccountsProps } from './interface';
import { Account as AccountInterface } from '../../../../../globalInterface';
import { ErrorResponse, AccountAction } from '../../../../../aliasType';
import {
  AccountSection, AccountsTitle, ChangeAccountButton, AccountsContainer,
  AccountSectionError, AccountSectionLoading, AccountSectionTablet, AccountSlider,
  AccountSectionDesktop, CreateAccountButton,
} from './ViewAccounts.styled';

let ERROR_TITLE = 'Error.';
let ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';
const NETWORK_CATCH_ERROR = 'Network Error';

const ViewAccounts = ({
  dashboardNotificationFunctions,
}: IViewAccountsProps) => {
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [accountsUI, setAccountsUI] = useAtom(accountsUIAtom);
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [windowSize] = useAtom(windowSizeAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const accountTitle = (accounts && accounts.length === 1) ? 'Account:' : 'Accounts:';

  const [error, setError] = useState<ErrorResponse>('No error');
  const [accountAction, setAccountAction] = useState<AccountAction>('Create');
  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);
  const [openChangeAccountModal, setOpenChangeAccountModal] = useState<boolean>(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState<boolean>(false);
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [modifyAccount, setModifyAccount] = useState<AccountInterface | null>(null);
  const accountToBeDeleted = useRef({ accountId: '', accountName: '' });

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

        const newAccountsUI = formatAccounts({ accounts: accountsData });
        setAccountsUI(newAccountsUI);

        const firstAccount = newAccountsUI[0];
        setSelectedAccount(firstAccount);
      } catch (errorCatched) {
        const newError = errorCatched as AxiosError;
        ERROR_DESCRIPTION = newError.message;
        setError('Other Error');
      }
    };
    if (user && bearerToken) getAccounts();
  }, [bearerToken, setAccounts, setAccountsUI, setSelectedAccount, user]);

  useEffect(() => {
    // If the only account is deleted, show AddAccount
    if (accountsUI.length < 1) {
      setShowAddAccount(true);
    } else {
      // If an account is created, don't show AddAccount
      setShowAddAccount(false);
    }
  }, [accountsUI.length]);

  const handleOpenChangeAccount = () => setOpenChangeAccountModal(true);
  const handleCloseChangeAccount = () => setOpenChangeAccountModal(false);

  const handleOpenDeleteAccount = (accountId: string, accountName: string) => {
    accountToBeDeleted.current.accountId = accountId;
    accountToBeDeleted.current.accountName = accountName;
    setOpenDeleteAccountModal(true);
  };
  const handleCloseDeleteAccount = () => setOpenDeleteAccountModal(false);

  const handleCloseCreateAccount = () => setOpenAccountModal(false);

  const handleOpenCreateAccount = () => {
    setAccountAction('Create');
    setOpenAccountModal(true);
  };

  const handleOpenModifyAccount = (accountId: string) => {
    const accountFound = accounts?.find((account) => account._id === accountId);
    if (accountFound) {
      setModifyAccount(accountFound);
    }
    setAccountAction('Modify');
    setOpenAccountModal(true);
  };

  const selectNewAccount = (accountSelected: AccountUI) => {
    if (selectedAccount?._id === accountSelected?._id) return;
    const accountId = accountSelected._id;

    const newAccountsUI = accountsUI.map((account) => {
      if (account._id === accountId) {
        const newSelectedAccount = { ...account, selected: true };
        setSelectedAccount(newSelectedAccount);
        return newSelectedAccount;
      }
      return { ...account, selected: false };
    });
    setAccountsUI(newAccountsUI);
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

  if (windowSize === 'Tablet') {
    return (
      <AccountSectionTablet>
        <AccountsTitle>{ accountTitle }</AccountsTitle>
        <AccountSlider>
          <AddAccount onClick={handleOpenCreateAccount} />
          { (accountsUI.length > 0) && accountsUI.map((account) => (
            <Account
              key={account._id}
              account={account}
              selectAccountOnClick={() => selectNewAccount(account)}
              openModifyAccountModal={handleOpenModifyAccount}
              openDeleteAccountModal={handleOpenDeleteAccount}
            />
          )) }
        </AccountSlider>
        <AccountDialog
          open={openAccountModal}
          onClose={handleCloseCreateAccount}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
          accountAction={accountAction}
          account={modifyAccount}
        />
        <DeleteAccountDialog
          open={openDeleteAccountModal}
          onClose={handleCloseDeleteAccount}
          accountId={accountToBeDeleted.current.accountId}
          accountName={accountToBeDeleted.current.accountName}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
        />
      </AccountSectionTablet>
    );
  }

  if (windowSize === 'Desktop') {
    return (
      <AccountSectionDesktop>
        <AccountsTitle>Account: </AccountsTitle>
        <AddAccount onClick={handleOpenCreateAccount} />
        { (accountsUI.length > 0) && accountsUI.map((account) => (
          <Account
            key={account._id}
            account={account}
            selectAccountOnClick={() => selectNewAccount(account)}
            openModifyAccountModal={handleOpenModifyAccount}
            openDeleteAccountModal={handleOpenDeleteAccount}
          />
        ))}
        <AccountDialog
          open={openAccountModal}
          onClose={handleCloseCreateAccount}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
          accountAction={accountAction}
          account={modifyAccount}
        />
        <DeleteAccountDialog
          open={openDeleteAccountModal}
          onClose={handleCloseDeleteAccount}
          accountId={accountToBeDeleted.current.accountId}
          accountName={accountToBeDeleted.current.accountName}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
        />
      </AccountSectionDesktop>
    );
  }

  return (
    <AccountSection>
      <CreateAccountButton variant="contained" size="medium" onClick={handleOpenCreateAccount}>Create Account</CreateAccountButton>
      { (selectedAccount && accounts) && (
        <ChangeAccountButton variant="contained" size="medium" onClick={handleOpenChangeAccount}>Change account</ChangeAccountButton>
      )}
      <AccountsContainer>
        { selectedAccount && (
          <Account
            account={selectedAccount}
            selectAccountOnClick={() => selectNewAccount(selectedAccount)}
            openModifyAccountModal={handleOpenModifyAccount}
            openDeleteAccountModal={handleOpenDeleteAccount}
          />
        )}
        { (showAddAccount && !selectedAccount) && (
          <AddAccount onClick={handleOpenCreateAccount} />
        ) }
      </AccountsContainer>
      { (selectedAccount && accounts) && (
        <SelectAccountDialog
          open={openChangeAccountModal}
          onClose={handleCloseChangeAccount}
        />
      )}
      <AccountDialog
        open={openAccountModal}
        onClose={handleCloseCreateAccount}
        dashboardNotificationFunctions={dashboardNotificationFunctions}
        accountAction={accountAction}
        account={modifyAccount}
      />
      <DeleteAccountDialog
        open={openDeleteAccountModal}
        onClose={handleCloseDeleteAccount}
        accountId={accountToBeDeleted.current.accountId}
        accountName={accountToBeDeleted.current.accountName}
        dashboardNotificationFunctions={dashboardNotificationFunctions}
      />
    </AccountSection>
  );
};

export { ViewAccounts };
