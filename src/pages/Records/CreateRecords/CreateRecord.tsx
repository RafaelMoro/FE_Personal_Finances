import { SystemStateEnum } from '../../../enums';
import { RecordTemplate } from '../../../components/UI/Records/features/RecordTemplate/RecordTemplate';
import { useNotification } from '../../../hooks/useNotification';
import { Notification } from '../../../components/UI';
import { NotificationFunctions } from '../../Dashboard/interface';

const CreateRecord = () => {
  const {
    notification, toggleShowNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus,
  } = useNotification({
    title: '', description: '', status: SystemStateEnum.Info,
  });
  const dashboardNotificationFunctions: NotificationFunctions = {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  };
  return (
    <>
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={toggleShowNotification}
      />
      )}
      <RecordTemplate notificationFunctions={dashboardNotificationFunctions} />
    </>
  );
};

export { CreateRecord };
