import { useEffect, useState } from 'react';

import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE } from '../../../Records/constants';
import { ViewAccountsProps } from './interface';
import { AccountUI } from '../../interface';
import { useDate } from '../../../../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccounts, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
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
import { useFetchAccountsQuery } from '../../../../../redux/slices/Accounts/actions';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const ViewAccounts = ({ hide, accountsActions }: ViewAccountsProps) => {
  const dispatch = useAppDispatch();
  const accountsState = useAppSelector((state) => state.accounts);
  const user = useAppSelector((state) => state.user);
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = accountsState?.accounts;
  const selectedAccount = accountsState?.accountSelected;
  const bearerToken = user.userInfo?.bearerToken as string;
  const {
    currentData, isSuccess, isLoading, isError,
  } = useFetchAccountsQuery(bearerToken, { skip: !bearerToken });
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
    if (currentData && isSuccess) {
      dispatch(updateAccounts(currentData));
      const [firstAccount] = currentData;
      dispatch(updateSelectedAccount(firstAccount));
    }
  }, [bearerToken, currentData, dispatch, isSuccess]);

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
    dispatch(updateAccounts(newAccountsUI));

    // Fetch records of selected account
    const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
    // dispatch(fetchCurrentMonthRecords({ recordsFullRoute: expensesFullRoute, bearerToken }));
  };

  if (isLoading) {
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

  if (isError) {
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
