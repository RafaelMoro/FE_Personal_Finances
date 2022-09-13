import { getLocalStorageInfo } from './getInfoLocalStorage';
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
