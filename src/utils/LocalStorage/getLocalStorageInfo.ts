const localStorageKey = process.env.REACT_APP_LOCAL_STORAGE;

function createLocalStorage() {
  if (!localStorageKey) {
    throw new Error('Unable to get the local storage name from the env variable. Please check');
  }
  const emptyLocalStorageInfo = {};
  const stringifiedEmptyLocalStorage = JSON.stringify(emptyLocalStorageInfo);
  localStorage.setItem(localStorageKey, stringifiedEmptyLocalStorage);
}

export function getLocalStorageInfo() {
  if (!localStorageKey) {
    throw new Error('Unable to get the local storage name from the env variable. Please check');
  }

  let getLocalStorageValues: null | string;
  do {
    getLocalStorageValues = localStorage.getItem(localStorageKey);
    if (!getLocalStorageValues) {
      createLocalStorage();
    }
  } while (!getLocalStorageValues);

  const parsedLocalStorageInfo = JSON.parse(getLocalStorageValues);
  return parsedLocalStorageInfo;
}
