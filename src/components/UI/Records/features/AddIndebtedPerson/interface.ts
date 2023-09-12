import { IndebtedPeople } from '../../../../../globalInterface';

export interface AddIndebtedPersonProps {
  open: boolean;
  onClose: () => void;
  updateData: (indebtedPeople: IndebtedPeople) => void;
  indebtedPeople?: IndebtedPeople[];
}
