import { IndebtedPeople } from '../../../../../globalInterface';

export interface RecordTemplateProps {
  edit?: boolean;
}

export interface AdditionalData {
  budgets: string[];
  tags: string[];
  indebtedPeople: IndebtedPeople[];
}
