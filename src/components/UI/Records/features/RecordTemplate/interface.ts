import { NotificationFunctions } from '../../../../../pages/Dashboard/interface';

export interface RecordTemplateProps {
  edit?: boolean;
  notificationFunctions: NotificationFunctions;
}

export interface AdditionalData {
  budgets: string[];
  tag: string[];
}

export type TypeOfRecord = 'expense' | 'income';
