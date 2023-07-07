import { ReactNode } from 'react';

export interface IErrorProps {
  title?: string;
  description: string;
  children?: ReactNode;
  hideIcon?: boolean;
}
