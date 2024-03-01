import { getLocalStorageInfo } from './getLocalStorageInfo';
import { saveInfoToLocalStorage } from './saveInfoToLocalStorage';

export function addToLocalStorage(newInfo: object) {
  const localStorageInfo = getLocalStorageInfo();
  const newLocalStorage = {
    ...localStorageInfo,
    ...newInfo,
  };
  saveInfoToLocalStorage(newLocalStorage);
  return newLocalStorage;
}
