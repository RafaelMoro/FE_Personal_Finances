import { useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { SystemStateEnum } from '../enums';
import { globalNotificationAtom } from '../atoms';

interface UseNotificationProps {
  title?: string;
  description?: string;
  status?: SystemStateEnum;
}

interface UpdateGlobalNotificationProps {
  newTitle: string;
  newDescription: string;
  newStatus: SystemStateEnum;
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
const useNotification = ({ title = '', description = '', status = SystemStateEnum.Info }: UseNotificationProps = {}) => {
  const [globalNotification, setGlobalNotification] = useAtom(globalNotificationAtom);
  const [localNotification, setLocalNotification] = useState<boolean>(false);
  const notificationInfo = useRef({
    title,
    description,
    status,
  });

  const toggleShowNotification = () => {
    setLocalNotification((prevState) => !prevState);
  };

  const showNotification = () => setLocalNotification(true);
  const hideNotification = () => setLocalNotification(false);

  const updateTitle = (newTitle: string):void => {
    notificationInfo.current.title = newTitle;
  };

  const updateDescription = (newDescription: string):void => {
    notificationInfo.current.description = newDescription;
  };

  const updateStatus = (newStatus: SystemStateEnum):void => {
    notificationInfo.current.status = newStatus;
  };

  function updateGlobalTitle(newTitle: string):void {
    setGlobalNotification({ ...globalNotification, title: newTitle });
  }

  function updateGlobalDescription(newDescription: string):void {
    setGlobalNotification({ ...globalNotification, description: newDescription });
  }

  function updateGlobalStatus(newStatus: SystemStateEnum):void {
    setGlobalNotification({ ...globalNotification, status: newStatus });
  }

  function updateGlobalNotification({ newTitle, newDescription, newStatus }: UpdateGlobalNotificationProps):void {
    setGlobalNotification({
      title: newTitle,
      description: newDescription,
      status: newStatus,
      showNotification: true,
    });
  }

  function hideGlobalNotification() {
    setGlobalNotification({
      ...globalNotification,
      showNotification: false,
    });
  }

  function showGlobalNotification() {
    setGlobalNotification({
      ...globalNotification,
      showNotification: true,
    });
  }

  function toggleGlobalNotification() {
    setGlobalNotification({
      ...globalNotification,
      showNotification: !globalNotification.showNotification,
    });
  }

  return {
    notification: localNotification,
    notificationInfo,
    toggleShowNotification,
    showNotification,
    hideNotification,
    updateTitle,
    updateDescription,
    updateStatus,
    globalNotification,
    updateGlobalTitle,
    updateGlobalDescription,
    updateGlobalStatus,
    updateGlobalNotification,
    showGlobalNotification,
    hideGlobalNotification,
    toggleGlobalNotification,
  };
};

export { useNotification };
