import { RecordTemplate } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate';
import { useNotification } from '../../../hooks/useNotification';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';
import { Notification } from '../../../components/UI';

const CreateRecord = () => {
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
      <RecordTemplate />
    </>
  );
};

export { CreateRecord };
