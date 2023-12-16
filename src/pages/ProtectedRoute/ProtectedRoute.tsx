import { Outlet, Navigate } from 'react-router-dom';

import { IProtectedRouteProps } from './interface';
import { useAppSelector } from '../../redux/hooks';

const ProtectedRoute = ({ redirectPath = '/' }: IProtectedRouteProps) => {
  const userReduxState = useAppSelector((state) => state.user);

  if (!userReduxState) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export { ProtectedRoute };
