import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

interface WrapperProps {
  children: ReactNode;
}

export function WrapperRedux({ children }: WrapperProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
