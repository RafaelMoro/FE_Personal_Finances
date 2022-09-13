import { getLocalStorageInfo } from './getLocalStorageInfo';
import { saveInfoToLocalStorage } from './saveInfoToLocalStorage';

export function updateLocalStorage(newInfo: object) {
  const localStorageInfo = getLocalStorageInfo();
  const newLocalStorage = {
    ...localStorageInfo,
    ...newInfo,
  };
  saveInfoToLocalStorage(newLocalStorage);
  return newLocalStorage;
}
