import { AccountUI } from '../../components/UI/Account/Account.interface';
import { Account, AnyRecord, RecordRedux } from '../../globalInterface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateAccounts, updateAccountsLocalStorage, updateSelectedAccount } from '../../redux/slices/Accounts/accounts.slice';
import { saveRecordsLocalStorage, saveRecordsLocalStorageSelectedAccount } from '../../redux/slices/Records';
import { signOn } from '../../redux/slices/User/user.slice';
import { addToLocalStorage, formatAccounts } from '../../utils';
import { RecordsLocalStorage } from '../../utils/LocalStorage/interface';
import { AMERICAN_EXPRESS_ID, CITIBANAMEX_DEBIT_ID } from './constants';
import { useGuestUserMocks } from './useGuestUserMocks';
import { transformRecordReduxtoAnyRecord } from './utils';

const useGuestUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const firstName = user?.user?.firstName ?? '';
  const isGuestUser: boolean = firstName === 'Guest';
  const userLoggedOn = !!firstName && firstName !== 'Guest';
  const recordsLocalStorageSelectedAccount = useAppSelector((state) => state.records.recordsLocalStorageSelectedAccount);
  const recordsLocalStorageCurrentMonth: RecordRedux[] = recordsLocalStorageSelectedAccount?.records?.currentMonth ?? [];
  const recordsLocalStorageLastMonth: RecordRedux[] = recordsLocalStorageSelectedAccount?.records?.lastMonth ?? [];
  const recordsCurrentMonthLocalStorage: AnyRecord[] = recordsLocalStorageCurrentMonth.map(transformRecordReduxtoAnyRecord);
  const recordsLastMonthLocalStorage: AnyRecord[] = recordsLocalStorageLastMonth.map(transformRecordReduxtoAnyRecord);
  const {
    recordsAmericanExpress, recordsDebitAccount, accounts, guestUser,
  } = useGuestUserMocks();

  const loadRecords = (selectedAccount: AccountUI, records: RecordsLocalStorage[]) => {
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
    addToLocalStorage({ newInfo: { user: guestUser } });

    // Add accounts
    dispatch(updateAccountsLocalStorage(accounts));
    const accountsUI = formatAccounts({ accounts, selectedAccountId: accounts[1]._id });
    dispatch(updateAccounts(accountsUI));
    dispatch(updateSelectedAccount(accountsUI[1]));
    addToLocalStorage({ newInfo: { accounts } });

    const records: RecordsLocalStorage[] = [
      {
        account: CITIBANAMEX_DEBIT_ID,
        records: {
          currentMonth: recordsDebitAccount,
          lastMonth: [],
          olderRecords: [],
        },
      },
      {
        account: AMERICAN_EXPRESS_ID,
        records: {
          currentMonth: recordsAmericanExpress,
          lastMonth: [],
          olderRecords: [],
        },
      },
    ];
    addToLocalStorage({ newInfo: { records } });
    dispatch(saveRecordsLocalStorage(records));
    // Load records
    loadRecords(accountsUI[1], records);
  };

  const loadGuestUser = ({ accountsLocalStorage, recordsLocalStorage }:
  { accountsLocalStorage: Account[], recordsLocalStorage: RecordsLocalStorage[] }) => {
    dispatch(signOn(guestUser));
    // Check is the account local american express exist.
    const amexExist = accountsLocalStorage.some((account) => account._id === AMERICAN_EXPRESS_ID);
    // Make the local american express as the selected account. If it does not exist, select the first account.
    const selectedAccountId = amexExist ? AMERICAN_EXPRESS_ID : null;
    // Load accounts local storage
    dispatch(updateAccountsLocalStorage(accountsLocalStorage));
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
    userLoggedOn,
    recordsCurrentMonthLocalStorage,
    recordsLastMonthLocalStorage,
    addGuestUser,
    loadGuestUser,
    loadRecords,
  };
};

export { useGuestUser };
