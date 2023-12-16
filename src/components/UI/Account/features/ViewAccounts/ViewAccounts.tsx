import { useEffect, useState } from 'react';
import { AxiosRequestHeaders } from 'axios';

import { ViewAccountsProps } from './interface';
import { AccountUI } from '../../interface';
import { useAccountsActions } from '../../../../../hooks/useAccountsActions';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccountsWithNewSelectedAccount, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
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

const ViewAccounts = ({ hide }: ViewAccountsProps) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const user = useAppSelector((state) => state.user);
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = accounts?.accounts;
  const selectedAccount = accounts?.accountSelected;
  const bearerToken = user.userInfo?.bearerToken as AxiosRequestHeaders;

  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);

  const {
    accountAction,
    openAccountModal,
    openChangeAccountModal,
    modifyAccount,
    openDeleteAccountModal,
    accountToBeDeleted,
    handleCloseCreateAccount,
    handleOpenCreateAccount,
    handleOpenModifyAccount,
    handleCloseChangeAccount,
    handleCloseDeleteAccount,
    handleOpenDeleteAccount,
  } = useAccountsActions();

  useEffect(() => {
    if (user.userInfo) {
      dispatch(fetchAccounts({ bearerToken }));
    }
  }, [bearerToken, dispatch, user.userInfo]);

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
          onClose={handleCloseCreateAccount}
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
          onClose={handleCloseCreateAccount}
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
          open={openChangeAccountModal}
          onClose={handleCloseChangeAccount}
        />
      )}
      <AccountDialog
        open={openAccountModal}
        onClose={handleCloseCreateAccount}
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
