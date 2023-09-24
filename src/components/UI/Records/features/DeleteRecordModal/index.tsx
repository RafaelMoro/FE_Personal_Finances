import { Dialog } from '@mui/material';
import { useAtom } from 'jotai';

import { AxiosRequestHeaders } from 'axios';
import { userAtom } from '../../../../../atoms';
import { POST_DELETE_EXPENSE_ROUTE, POST_DELETE_INCOME_ROUTE } from '../../constants';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { DeleteRecordContainer, DeleteRecordTitle, DeleteRecordWarn } from './DeleteRecordModal.styled';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
  recordName: string;
  recordId: string;
  isExpense: boolean;
}

const DeleteRecordModal = ({
  open, onClose, recordName, recordId, isExpense,
}: DeleteRecordModalProps) => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const valuesDeleteRecord = { recordId };

  const deleteExpense = async () => {
    const responseDeleteExpense = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      POST_DELETE_EXPENSE_ROUTE,
      'delete',
      bearerToken,
    );
    onClose();
    // Lanzar query para modificar amount de la cuenta.
    // Cerrar Drawer
    // Refetch data
  };

  const deleteIncome = async () => {
    const responseDeleteExpense = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      POST_DELETE_INCOME_ROUTE,
      'delete',
      bearerToken,
    );
    // Lanzar query para modificar amount de la cuenta.
    // Cerrar Drawer
    // Refetch data
    onClose();
  };

  const handleSubmit = isExpense ? deleteExpense : deleteIncome;

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
        <CancelButton onClick={handleSubmit}>Delete</CancelButton>
      </DeleteRecordContainer>
    </Dialog>
  );
};

export { DeleteRecordModal };
