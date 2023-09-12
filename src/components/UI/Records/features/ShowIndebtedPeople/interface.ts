import { IndebtedPeople } from '../../../../../globalInterface';

export interface ShowIndebtedPeopleProps {
  indebtedPeople: IndebtedPeople[];
  inRecordDrawer?: boolean;
  deleteIndebtedPerson?: (personName: string) => void;
  // Function that passes the person name, fetches the person information and open the modal to modify it.
  modifyIndebtedPerson?: (personName: string) => void;
}
