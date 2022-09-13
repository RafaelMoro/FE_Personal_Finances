const localStorageKey = process.env.REACT_APP_LOCAL_STORAGE;

export function saveInfoToLocalStorage(localStorageInfo: object):void {
  if (!localStorageKey) {
    throw new Error('Unable to get the local storage name from the env variable. Please check');
  }
  const stringifiedLocalStorageInfo = JSON.stringify(localStorageInfo);
  localStorage.setItem(localStorageKey, stringifiedLocalStorageInfo);
}
