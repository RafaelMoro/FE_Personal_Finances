import { useEffect, useState } from 'react';
import { AxiosRequestHeaders } from 'axios';

import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE } from '../../../Records/constants';
import { ViewAccountsProps } from './interface';
import { AccountUI } from '../../interface';
import { useDate } from '../../../../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccountsWithNewSelectedAccount, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
import { fetchCurrentMonthRecords } from '../../../../../redux/slices/Records/actions/fetchCurrentMonthRecords';
import { fetchAccounts } from '../../../../../redux/slices/Accounts/actions';
import { Error } from '../../../Error';
import { Account } from '../../Account';
import { AccountLoading } from '../AccountLoading';
import { AddAccount } from '../AddAccount';
import { AccountDialog } from '../AccountDialog';
import { DeleteAccountDialog } from '../DeleteAccountDialog';
import { SelectAccountDialog } from '../SelectAccountDialog';
import {
  AccountSection, AccountsContainer,
  AccountSectionError, AccountSectionLoading, AccountSectionTablet, AccountSlider,
  AccountSectionDesktop,
} from './ViewAccounts.styled';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const ViewAccounts = ({ hide, accountsActions }: ViewAccountsProps) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const user = useAppSelector((state) => state.user);
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = accounts?.accounts;
  const selectedAccount = accounts?.accountSelected;
  const bearerToken = user.userInfo?.bearerToken as AxiosRequestHeaders;
  const { month, year } = useDate();

  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);

  const {
    accountAction,
    openAccountModal,
    openChangeToOtherAccountModal,
    modifyAccount,
    openDeleteAccountModal,
    accountToBeDeleted,
    handleCloseAccountModal,
    handleOpenCreateAccount,
    handleOpenModifyAccount,
    toggleChangeOtherAccountModal,
    handleCloseDeleteAccount,
    handleOpenDeleteAccount,
  } = accountsActions;

  useEffect(() => {
    // Fetch only if we have user info and if we haven't fetched accounts before.
    if (user.userInfo && !accounts.accounts) {
      // If we got an error after fetching the first time, don't keep trying to fetch.
      if (!accounts.error) dispatch(fetchAccounts({ bearerToken }));
    }
  }, [accounts, bearerToken, dispatch, user.userInfo]);

  useEffect(() => {
    // If the only account is deleted, show AddAccount
    if (accountsUI && accountsUI.length < 1) {
      setShowAddAccount(true);
    } else {
      // If an account is created, don't show AddAccount
      setShowAddAccount(false);
    }
  }, [accountsUI, accountsUI?.length]);

  const selectNewAccount = (accountSelected: AccountUI) => {
    if (selectedAccount?._id === accountSelected?._id) return;
    const accountId = accountSelected._id;

    const newAccountsUI = (accountsUI || []).map((account) => {
      if (account._id === accountId) {
        const newSelectedAccount = { ...account, selected: true };
        // Here we are selecting the new account.
        dispatch(updateSelectedAccount(newSelectedAccount));
        return newSelectedAccount;
      }
      return { ...account, selected: false };
    });
    dispatch(updateAccountsWithNewSelectedAccount(newAccountsUI));

    // Fetch records of selected account
    const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
    dispatch(fetchCurrentMonthRecords({ expensesFullRoute, bearerToken }));
  };

  if (accounts.loading) {
    return (
      <AccountSectionLoading>
        <AccountLoading />
        { (windowSize !== 'Mobile') && (
          <>
            <AccountLoading />
            <AccountLoading />
          </>
        ) }
      </AccountSectionLoading>
    );
  }

  if (accounts.error) {
    return (
      <AccountSectionError>
        <Error title={ERROR_TITLE} description={ERROR_DESCRIPTION} />
      </AccountSectionError>
    );
  }

  if (windowSize === 'Tablet') {
    return (
      <AccountSectionTablet hide={hide}>
        <AccountSlider>
          { (accountsUI && accountsUI.length > 0) && (<AddAccount onClick={handleOpenCreateAccount} />)}
          { (accountsUI && accountsUI.length > 0) && accountsUI.map((account) => (
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
          onClose={handleCloseAccountModal}
          accountAction={accountAction}
          account={modifyAccount}
        />
        <DeleteAccountDialog
          open={openDeleteAccountModal}
          onClose={handleCloseDeleteAccount}
          accountId={accountToBeDeleted.current.accountId}
          accountName={accountToBeDeleted.current.accountName}
        />
      </AccountSectionTablet>
    );
  }

  if (windowSize === 'Desktop') {
    return (
      <AccountSectionDesktop hide={hide}>
        <AddAccount onClick={handleOpenCreateAccount} />
        { (accountsUI && accountsUI.length > 0) && accountsUI.map((account) => (
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
          onClose={handleCloseAccountModal}
          accountAction={accountAction}
          account={modifyAccount}
        />
        <DeleteAccountDialog
          open={openDeleteAccountModal}
          onClose={handleCloseDeleteAccount}
          accountId={accountToBeDeleted.current.accountId}
          accountName={accountToBeDeleted.current.accountName}
        />
      </AccountSectionDesktop>
    );
  }

  return (
    <AccountSection hide={hide}>
      <AccountsContainer>
        { selectedAccount && (
          <Account
            account={selectedAccount}
            selectAccountOnClick={() => selectNewAccount(selectedAccount)}
            openModifyAccountModal={handleOpenModifyAccount}
            openDeleteAccountModal={handleOpenDeleteAccount}
          />
        )}
        { ((showAddAccount) && (!selectedAccount) && (accountsUI && accountsUI.length > 0)) && (
          <AddAccount onClick={handleOpenCreateAccount} />
        ) }
      </AccountsContainer>
      { (selectedAccount && accountsUI) && (
        <SelectAccountDialog
          open={openChangeToOtherAccountModal}
          onClose={toggleChangeOtherAccountModal}
        />
      )}
      <AccountDialog
        open={openAccountModal}
        onClose={handleCloseAccountModal}
        accountAction={accountAction}
        account={modifyAccount}
      />
      <DeleteAccountDialog
        open={openDeleteAccountModal}
        onClose={handleCloseDeleteAccount}
        accountId={accountToBeDeleted.current.accountId}
        accountName={accountToBeDeleted.current.accountName}
      />
    </AccountSection>
  );
};

export { ViewAccounts };
