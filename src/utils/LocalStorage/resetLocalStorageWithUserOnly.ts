import { getLocalStorageInfo } from './getLocalStorageInfo';
import { BudgetMasterLocalStorage } from './interface';
import { saveInfoToLocalStorage } from './saveInfoToLocalStorage';

export function resetLocalStorageWithUserOnly() {
  const localStorageInfo: BudgetMasterLocalStorage = getLocalStorageInfo();
  const { user, bearerToken, accessToken } = localStorageInfo;
  saveInfoToLocalStorage({ user, bearerToken, accessToken });
}
