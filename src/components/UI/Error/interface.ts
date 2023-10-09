import { ReactNode } from 'react';

export interface ErrorProps {
  title?: string;
  description: string;
  children?: ReactNode;
  hideIcon?: boolean;
}
