import { useState, useRef } from 'react';
import { useAppSelector } from '../redux/hooks';
import { AccountActions, AccountToBeDeleted, AccountUI } from '../components/UI/Account/interface';
import { ModalAction } from '../aliasType';

const useAccountsActions = (): AccountActions => {
  const accountsReduxState = useAppSelector((state) => state.accounts);
  const [accountAction, setAccountAction] = useState<ModalAction>('Create');

  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [openChangeToOtherAccountModal, setopenChangeToOtherAccountModal] = useState<boolean>(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState<boolean>(false);
  const [modifyAccount, setModifyAccount] = useState<AccountUI | null>(null);

  const accountToBeDeleted = useRef<AccountToBeDeleted>({ accountId: '', accountName: '' });

  const handleCloseAccountModal = () => setOpenAccountModal(false);

  const handleOpenCreateAccount = () => {
    setAccountAction('Create');
    setOpenAccountModal(true);
  };

  const toggleChangeOtherAccountModal = () => setopenChangeToOtherAccountModal((prevState) => !prevState);

  const handleOpenDeleteAccount = (accountId: string, accountName: string) => {
    accountToBeDeleted.current.accountId = accountId;
    accountToBeDeleted.current.accountName = accountName;
    setOpenDeleteAccountModal(true);
  };
  const handleCloseDeleteAccount = () => setOpenDeleteAccountModal(false);

  const handleOpenModifyAccount = (accountId: string) => {
    const accountFound = accountsReduxState.accounts?.find((account) => account._id === accountId);
    if (accountFound) {
      setModifyAccount(accountFound);
    }
    setAccountAction('Modify');
    setOpenAccountModal(true);
  };

  return {
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
  };
};

export { useAccountsActions };
