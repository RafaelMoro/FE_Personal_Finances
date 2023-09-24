import { Dialog } from '@mui/material';
import { CancelButton, Paragraph, SecondaryButton } from '../../../../../styles';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteRecordModal = ({ open, onClose }: DeleteRecordModalProps) => {
  const something = '';
  return (
    <Dialog open={open} onClose={onClose}>
      <Paragraph>Are you sure that you want to delete the record x?</Paragraph>
      <Paragraph>You cannot reverse this action.</Paragraph>
      <CancelButton>Delete</CancelButton>
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
    </Dialog>
  );
};

export { DeleteRecordModal };
