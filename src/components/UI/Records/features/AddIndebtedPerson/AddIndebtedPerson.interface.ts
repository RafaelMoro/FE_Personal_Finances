import { IndebtedPeople } from '../../../../../globalInterface';

export interface AddIndebtedPersonProps {
  open: boolean;
  onClose: () => void;
  addPerson: (indebtedPeople: IndebtedPeople) => void;
  indebtedPeople?: IndebtedPeople[];
  // Indebted person to be modified
  indebtedPerson: IndebtedPeople | null;
  // Flag to know if the user wants to add a new person or modify an existing one.
  modifyAction: boolean;
  // Function that updates the indebted person
  updatePerson: (indebtedPeople: IndebtedPeople) => void;
}
