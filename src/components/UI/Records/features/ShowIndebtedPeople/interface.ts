import { IndebtedPeople } from '../../../../../globalInterface';

export interface ShowIndebtedPeopleProps {
  indebtedPeople: IndebtedPeople[];
  inRecordDrawer?: boolean;
  deleteIndebtedPerson?: (personName: string) => void;
}
