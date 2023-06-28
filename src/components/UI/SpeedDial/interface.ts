import { ReactElement } from 'react';

export interface SpeedDialActions {
  icon: ReactElement;
  name: string;
}

export interface SpeedDialProps {
  actions: SpeedDialActions[];
  ariaLabelDescription: string;
}

export interface CurrentDashboardActionsProps {
  hideChangeAccount?: boolean;
  hideAddRecord?: boolean;
}
