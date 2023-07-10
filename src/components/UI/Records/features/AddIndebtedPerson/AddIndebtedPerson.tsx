import { Dialog } from '@mui/material';
import { ParagraphTitle } from '../../../../../styles';

interface AddIndebtedPersonProps {
  open: boolean;
  onClose: () => void;
}

const AddIndebtedPerson = ({ open, onClose }: AddIndebtedPersonProps) => {
  const something = '';

  return (
    <Dialog onClose={onClose} open={open}>
      <ParagraphTitle>Add Person</ParagraphTitle>
    </Dialog>
  );
};

export { AddIndebtedPerson };
