import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { Error } from '../../../Error';
import { Account } from '../../Account';
import { AccountLoading } from '../AccountLoading';
import { AddAccount } from '../AddAccount';
import { AccountDialog } from '../AccountDialog';
import { DeleteAccountDialog } from '../DeleteAccountDialog';
import { SelectAccountDialog } from '../SelectAccountDialog';
import {
  windowSizeAtom,
  openAccountModalAtom, openChangeAccountModalAtom,
} from '../../../../../atoms';
import { AccountUI } from '../../interface';
import {
  AccountSection, AccountsContainer,
  AccountSectionError, AccountSectionLoading, AccountSectionTablet, AccountSlider,
  AccountSectionDesktop,
} from './ViewAccounts.styled';
import { useAccountsActions } from '../../../../../hooks/useAccountsActions';
import { ViewAccountsProps } from './interface';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { updateAccountsWithNewSelectedAccount, updateSelectedAccount } from '../../../../../redux/slices/Accounts/accounts.slice';
import { fetchAccounts } from '../../../../../redux/slices/Accounts/fetchAccounts';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const ViewAccounts = ({ hide }: ViewAccountsProps) => {
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
  const accountsReduxState = useAppSelector((state) => state.accounts);
  const accountsUI = accountsReduxState?.accounts;
  const selectedAccount = accountsReduxState?.accountSelected;
  const bearerToken = userReduxState.userInfo?.bearerToken as AxiosRequestHeaders;

  const [openAccountModal] = useAtom(openAccountModalAtom);
  const [openChangeAccountModal] = useAtom(openChangeAccountModalAtom);
  const [windowSize] = useAtom(windowSizeAtom);

  const [showAddAccount, setShowAddAccount] = useState<boolean>(false);

  const {
    accountAction,
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
    if (userReduxState.userInfo) {
      dispatch(fetchAccounts({ bearerToken }));
    }
  }, [bearerToken, dispatch, userReduxState.userInfo]);

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

  if (accountsReduxState.loading) {
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

  if (accountsReduxState.error) {
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
