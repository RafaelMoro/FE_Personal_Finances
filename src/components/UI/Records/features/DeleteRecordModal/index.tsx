import { Dialog } from '@mui/material';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { DeleteRecordContainer, DeleteRecordTitle, DeleteRecordWarn } from './DeleteRecordModal.styled';
import { useRecords } from '../../../../../hooks/useRecords';
import { NotificationFunctions } from '../../../../../pages/Dashboard/interface';
import { AnyRecord } from '../../../../../globalInterface';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
  record: AnyRecord;
  isExpense: boolean;
}

const DeleteRecordModal = ({
  open, onClose, record, isExpense,
}: DeleteRecordModalProps) => {
  const { shortName: recordName } = record;
  // @TODO Checar como usare lo de las notificaciones.
  const notificationFunctions: NotificationFunctions = {
    updateTitle: () => {},
    updateDescription: () => {},
    updateStatus: () => {},
    toggleShowNotification: () => {},
  };
  const { deleteRecord } = useRecords({
    notificationFunctions, recordToBeDeleted: record, deleteRecordExpense: isExpense, closeDeleteRecordModalCb: onClose,
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
