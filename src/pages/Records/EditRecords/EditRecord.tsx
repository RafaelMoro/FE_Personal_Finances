import { useEffect } from 'react';
import { RecordTemplate } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate';
import { useNotification } from '../../../hooks/useNotification';
import { Notification } from '../../../components/UI';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setRecordToBeModified } from '../../../redux/slices/Records/records.slice';

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
      <RecordTemplate edit />
    </>
  );
};

export { EditRecord };
