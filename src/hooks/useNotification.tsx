import { useAtom } from 'jotai';
import { useRef } from 'react';

import { showNotificationAtom } from '../atoms';
import { SystemStateEnum } from '../enums';

interface UseNotificationProps {
  title: string;
  description: string;
  status: SystemStateEnum;
}

const useNotification = ({ title, description, status }: UseNotificationProps) => {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const notificationInfo = useRef({
    title,
    description,
    status,
  });

  const toggleShowNotification = () => {
    setShowNotification((prevState) => !prevState);
  };

  const updateTitle = (newTitle: string):void => {
    notificationInfo.current.title = newTitle;
  };

  const updateDescription = (newDescription: string):void => {
    notificationInfo.current.description = newDescription;
  };

  const updateStatus = (newStatus: SystemStateEnum):void => {
    notificationInfo.current.status = newStatus;
  };

  return {
    showNotification,
    notificationInfo,
    toggleShowNotification,
    updateTitle,
    updateDescription,
    updateStatus,
  };
};

export { useNotification };
