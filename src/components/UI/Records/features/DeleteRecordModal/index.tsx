import { Dialog } from '@mui/material';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { DeleteRecordContainer, DeleteRecordTitle, DeleteRecordWarn } from './DeleteRecordModal.styled';
import { useRecords } from '../../../../../hooks/useRecords';
import { AnyRecord } from '../../../../../globalInterface';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
  record: AnyRecord;
  isExpense: boolean;
  closeDrawer: () => void;
}

const DeleteRecordModal = ({
  open, onClose, record, isExpense, closeDrawer,
}: DeleteRecordModalProps) => {
  const { shortName: recordName } = record;
  const { deleteRecord } = useRecords({
    recordToBeDeleted: record, deleteRecordExpense: isExpense, closeDeleteRecordModalCb: onClose, closeDrawer,
  });

  return (
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
        <CancelButton onClick={deleteRecord}>Delete</CancelButton>
      </DeleteRecordContainer>
    </Dialog>
  );
};

export { DeleteRecordModal };
