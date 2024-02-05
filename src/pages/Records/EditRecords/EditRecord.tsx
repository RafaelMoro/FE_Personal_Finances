import { RecordTemplate } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate';
import { useNotification } from '../../../hooks/useNotification';
import { Notification } from '../../../components/UI';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';

const EditRecord = () => {
  useSyncLoginInfo();
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();

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
