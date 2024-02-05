import { getLocalStorageInfo } from './getLocalStorageInfo';
import { CountOnMeLocalStorage } from './interface';
import { saveInfoToLocalStorage } from './saveInfoToLocalStorage';

export function resetLocalStorageWithUserOnly() {
  const localStorageInfo: CountOnMeLocalStorage = getLocalStorageInfo();
  const { user } = localStorageInfo;
  saveInfoToLocalStorage({ user });
}
