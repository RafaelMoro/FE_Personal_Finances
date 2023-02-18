import { AxiosRequestHeaders, AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom } from '../../../../atoms';
import { IAccount } from '../../../../components/UI/Account/interface';
import { GetRequest } from '../../../../utils';
import { GET_ACCOUNTS_ROUTE } from './constants';

export const useAccounts = async () => {
  const [user] = useAtom(userAtom);
  const [accounts, setAccounts] = useState<IAccount []>([]);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  // useEffect(() => {
  //   const getAccounts = async () => {
  //     try {
  //       const accountsData = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);
  //       if (accountsData?.error) {
  //         const error = accountsData?.message as string;
  //         // eslint-disable-next-line no-console
  //         console.log(error);
  //         return;
  //       }
  //       setAccounts(accountsData);
  //     } catch (errorCatched) {
  //       const error = errorCatched as AxiosError;
  //       // eslint-disable-next-line no-console
  //       console.log(error.response?.data);
  //     }
  //   };
  //   if (user && bearerToken) getAccounts();
  // }, [bearerToken, user]);

  return accounts;
};
