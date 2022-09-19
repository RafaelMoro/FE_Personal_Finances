import { SystemStateIcons } from './utils';
import { INotificationProps } from './interface';

const Notification = ({ title, description, status }: INotificationProps) => (
  <section>
    <picture>
      { SystemStateIcons[status] }
    </picture>
    <h4>{title}</h4>
    <p>{description}</p>
  </section>
);

export { Notification };
