import { Dialog } from '@mui/material';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { DeleteRecordContainer, DeleteRecordTitle, DeleteRecordWarn } from './DeleteRecordModal.styled';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
  recordName: string;
}

const DeleteRecordModal = ({ open, onClose, recordName }: DeleteRecordModalProps) => (
  <Dialog open={open} onClose={onClose}>
    <DeleteRecordContainer>
      <DeleteRecordTitle>
        Are you sure that you want to delete the record:
        {' '}
        &quot;
        {recordName}
        &quot;
        ?
      </DeleteRecordTitle>
      <DeleteRecordWarn>You cannot reverse this action.</DeleteRecordWarn>
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <CancelButton>Delete</CancelButton>
    </DeleteRecordContainer>
  </Dialog>
);

export { DeleteRecordModal };
