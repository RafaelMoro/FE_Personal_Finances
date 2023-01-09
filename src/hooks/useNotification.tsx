import { useRef, useState } from 'react';

import { SystemStateEnum } from '../enums';

interface UseNotificationProps {
  title: string;
  description: string;
  status: SystemStateEnum;
}

/*
* useNotification manages when to show or hide the notification, what title, description
* and status should the component have.
*
* This hook recieves the props: title, description and status. Same as the notification component
* It returns:
*   - showNotification: flag to show or hide notification
*   - notificationInfo: is a react Ref that have title, description and status of the notification.
*   - toggleShowNotification: Function that toggles the showNotification flag.
*   - updateTitle: Function that updates the notification title.
*   - updateDescription: Function that updates the notification description.
*   - updateStatus: Function that updates the notification status.
*/
const useNotification = ({ title, description, status }: UseNotificationProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
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
