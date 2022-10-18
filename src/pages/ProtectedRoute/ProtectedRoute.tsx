import { useAtom } from 'jotai';
import { Outlet, Navigate } from 'react-router-dom';

import { userAtom } from '../../atoms';
import { IProtectedRouteProps } from './interface';

const ProtectedRoute = ({ redirectPath = '/' }: IProtectedRouteProps) => {
  const [user] = useAtom(userAtom);

  if (!user) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export { ProtectedRoute };
