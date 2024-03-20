import { useEffect } from 'react';
import { useNotification } from '../../../hooks/useNotification';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setRecordToBeModified } from '../../../redux/slices/Records/records.slice';

import { TransactionManager } from '../../../components/UI/Records/features/TransactionManager';
import { Notification } from '../../../components/UI';

const EditRecord = () => {
  const dispatch = useAppDispatch();
  const recordToBeEditedRedux = useAppSelector((state) => state.records.recordToBeModified);
  const { recordToBeEdited } = useSyncLoginInfo();
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();

  useEffect(() => {
    if (recordToBeEdited && !recordToBeEditedRedux) {
      dispatch(setRecordToBeModified(recordToBeEdited));
    }
  }, [dispatch, recordToBeEdited, recordToBeEditedRedux]);

  return (
    <>
      {globalNotification.showNotification && (
      <Notification
        title={globalNotification.title}
        description={globalNotification.description}
        status={globalNotification.status}
        close={toggleGlobalNotification}
      />
      )}
      <TransactionManager edit />
    </>
  );
};

export { EditRecord };
