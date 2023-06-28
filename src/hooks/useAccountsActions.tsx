import { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  accountsAtom, accountActionAtom, openAccountModalAtom, openChangeAccountModalAtom,
} from '../atoms';
import { Account as AccountInterface } from '../globalInterface';

const useAccountsActions = () => {
  const [accounts] = useAtom(accountsAtom);
  const [, setAccountAction] = useAtom(accountActionAtom);
  const [, setOpenAccountModal] = useAtom(openAccountModalAtom);
  const [, setOpenChangeAccountModal] = useAtom(openChangeAccountModalAtom);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState<boolean>(false);
  const [modifyAccount, setModifyAccount] = useState<AccountInterface | null>(null);

  const accountToBeDeleted = useRef({ accountId: '', accountName: '' });

  const handleCloseCreateAccount = () => setOpenAccountModal(false);

  const handleOpenCreateAccount = () => {
    setAccountAction('Create');
    setOpenAccountModal(true);
  };

  const handleOpenChangeAccount = () => setOpenChangeAccountModal(true);
  const handleCloseChangeAccount = () => setOpenChangeAccountModal(false);

  const handleOpenDeleteAccount = (accountId: string, accountName: string) => {
    accountToBeDeleted.current.accountId = accountId;
    accountToBeDeleted.current.accountName = accountName;
    setOpenDeleteAccountModal(true);
  };
  const handleCloseDeleteAccount = () => setOpenDeleteAccountModal(false);

  const handleOpenModifyAccount = (accountId: string) => {
    const accountFound = accounts?.find((account) => account._id === accountId);
    if (accountFound) {
      setModifyAccount(accountFound);
    }
    setAccountAction('Modify');
    setOpenAccountModal(true);
  };

  return {
    modifyAccount,
    openDeleteAccountModal,
    accountToBeDeleted,
    handleCloseCreateAccount,
    handleOpenCreateAccount,
    handleOpenModifyAccount,
    handleOpenChangeAccount,
    handleCloseChangeAccount,
    handleCloseDeleteAccount,
    handleOpenDeleteAccount,
  };
};

export { useAccountsActions };
