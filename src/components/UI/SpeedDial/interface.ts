import { ReactElement } from 'react';

export interface SpeedDialActions {
  icon: ReactElement;
  name: string;
  actionCallback: () => void;
}

export interface SpeedDialProps {
  actions: SpeedDialActions[];
  ariaLabelDescription: string;
}

export interface CurrentDashboardActionsProps {
  hideChangeAccount?: boolean;
  hideAddRecord?: boolean;
}
