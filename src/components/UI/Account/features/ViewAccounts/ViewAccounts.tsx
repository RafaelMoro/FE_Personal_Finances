import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { Error } from '../../../Error';
import { Account } from '../../Account';
import { AccountLoading } from '../AccountLoading';
import { AddAccount } from '../AddAccount';
import { AccountDialog } from '../AccountDialog';
import { SelectAccountDialog } from '../SelectAccountDialog';
import {
  userAtom, accountsAtom, selectedAccountAtom, accountsUIAtom,
} from '../../../../../atoms';
import { formatNumberToCurrency, GetRequest } from '../../../../../utils';
import { GET_ACCOUNTS_ROUTE } from './constants';
import { AccountUI } from '../../interface';
import { Account as AccountInterface } from '../../../../../globalInterface';
import { ErrorResponse, WindowSizeValues, AccountAction } from '../../../../../aliasType';
import {
  AccountSection, AccountsTitle, ChangeAccountButton, AccountsContainer,
  AccountSectionError, AccountSectionLoading, AccountSectionTablet, AccountSlider,
  AccountSectionDesktop, CreateAccountButton,
} from './ViewAccounts.styled';
import { IViewAccountsProps } from './interface';

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
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const accountTitle = (accounts && accounts.length === 1) ? 'Account:' : 'Accounts:';

  const [error, setError] = useState<ErrorResponse>('No error');
  const [windowSize, setWindowSize] = useState<WindowSizeValues>('Mobile');
  const [accountAction, setAccountAction] = useState<AccountAction>('Create');
  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);
  const [openChangeAccountModal, setOpenChangeAccountModal] = useState<boolean>(false);
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [modifyAccount, setModifyAccount] = useState<AccountInterface | null>(null);

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

        const newAccountsUI: AccountUI[] = accountsData.map((
          account: AccountInterface,
          index: number,
        ) => {
          if (index === 0) {
            return {
              ...account,
              selected: true,
              amount: formatNumberToCurrency(account.amount),
            };
          }
          return {
            ...account,
            selected: false,
            amount: formatNumberToCurrency(account.amount),
          };
        });
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
    function handleResize(event: UIEvent) {
      const target = event.target as Window;

      if (target.innerWidth < 480) setWindowSize('Mobile');
      if (target.innerWidth > 480 && target.innerWidth < 1024) setWindowSize('Tablet');
      if (target.innerWidth > 1024) setWindowSize('Desktop');
    }

    if (window.innerWidth > 480 && window.innerWidth < 1024) setWindowSize('Tablet');
    if (window.innerWidth > 1024) setWindowSize('Desktop');

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenChangeAccount = () => setOpenChangeAccountModal(true);

  const handleCloseChangeAccount = () => {
    setOpenChangeAccountModal(false);
  };

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

  const selectNewAccount = (account: AccountUI) => {
    if (selectedAccount?._id === account?._id) return;
    setSelectedAccount(account);
  };

  const updateSelectedAccount = (newAccount: AccountUI) => setSelectedAccount(newAccount);

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
            />
          )) }
        </AccountSlider>
        <AccountDialog
          open={openAccountModal}
          onClose={handleCloseCreateAccount}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
          accountAction={accountAction}
          account={modifyAccount}
          updateSelectedAccount={updateSelectedAccount}
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
          />
        ))}
        <AccountDialog
          open={openAccountModal}
          onClose={handleCloseCreateAccount}
          dashboardNotificationFunctions={dashboardNotificationFunctions}
          accountAction={accountAction}
          account={modifyAccount}
          updateSelectedAccount={updateSelectedAccount}
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
          />
        )}
        { (showAddAccount && !selectedAccount) && (
          <AddAccount onClick={handleOpenChangeAccount} />
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
        updateSelectedAccount={updateSelectedAccount}
      />
    </AccountSection>
  );
};

export { ViewAccounts };
