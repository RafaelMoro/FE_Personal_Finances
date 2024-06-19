import { AccountUI } from '../../components/UI/Account/interface';
import { Account } from '../../globalInterface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateAccounts, updateSelectedAccount } from '../../redux/slices/Accounts/accounts.slice';
import { saveRecordsLocalStorage, saveRecordsLocalStorageSelectedAccount } from '../../redux/slices/Records';
import { signOn } from '../../redux/slices/User/user.slice';
import { addToLocalStorage, formatAccounts } from '../../utils';
import { RecordsLocalStorage, RecordsLocalStorageRedux } from '../../utils/LocalStorage/interface';
import { AMERICAN_EXPRESS_ID, CITIBANAMEX_DEBIT_ID } from './constants';
import { useGuestUserMocks } from './useGuestUserMocks';

const useGuestUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const isGuestUser: boolean = user?.user?.firstName === 'Guest';
  const {
    recordsAmericanExpress, recordsDebitAccount, accounts, guestUser,
  } = useGuestUserMocks();

  const loadRecords = (selectedAccount: AccountUI, records: RecordsLocalStorageRedux[]) => {
    // Check What is the account id of the selected account
    const selectedAccountId = selectedAccount._id;
    // Search for the records of that account
    const recordsOfSelectedAccount = records.find((record) => record.account === selectedAccountId) ?? null;
    // Save records
    dispatch(saveRecordsLocalStorageSelectedAccount(recordsOfSelectedAccount));
  };

  const addGuestUser = () => {
    // Add user
    dispatch(signOn(guestUser));
    addToLocalStorage({ user: guestUser });

    // Add accounts
    const accountsUI = formatAccounts({ accounts, selectedAccountId: accounts[1]._id });
    dispatch(updateAccounts(accountsUI));
    dispatch(updateSelectedAccount(accountsUI[1]));
    addToLocalStorage({ accounts });

    const records: RecordsLocalStorage[] = [
      {
        account: CITIBANAMEX_DEBIT_ID,
        records: recordsDebitAccount,
      },
      {
        account: AMERICAN_EXPRESS_ID,
        records: recordsAmericanExpress,
      },
    ];
    const recordsRedux: RecordsLocalStorageRedux[] = records.map((recordLocalStorage) => ({
      ...recordLocalStorage,
      records: recordLocalStorage.records.map((record) => ({
        ...record,
        date: record.date.toISOString(),
      })),
    }));
    addToLocalStorage({ records: recordsRedux });
    dispatch(saveRecordsLocalStorage(recordsRedux));
    // Load records
    loadRecords(accountsUI[1], recordsRedux);
  };

  const loadGuestUser = ({ accountsLocalStorage, recordsLocalStorage }:
  { accountsLocalStorage: Account[], recordsLocalStorage: RecordsLocalStorageRedux[] }) => {
    dispatch(signOn(guestUser));
    // Check is the account local american express exist.
    const amexExist = accountsLocalStorage.some((account) => account._id === AMERICAN_EXPRESS_ID);
    // Make the local american express as the selected account. If it does not exist, select the first account.
    const selectedAccountId = amexExist ? AMERICAN_EXPRESS_ID : null;
    // Format accounts
    const accountsUI = formatAccounts({ accounts: accountsLocalStorage, selectedAccountId });
    const newSelectedAccount = accountsUI.find((account) => account._id === AMERICAN_EXPRESS_ID) ?? accountsUI[0];

    // Load accounts UI
    dispatch(updateAccounts(accountsUI));
    dispatch(updateSelectedAccount(newSelectedAccount));

    // Load records
    loadRecords(newSelectedAccount, recordsLocalStorage);
  };

  return {
    isGuestUser,
    addGuestUser,
    loadGuestUser,
    loadRecords,
  };
};

export { useGuestUser };
