import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccountLoading } from '../features/AccountLoading';

export default {
  title: 'UI/Account',
  component: AccountLoading
} as ComponentMeta<typeof AccountLoading>;

export const AccountLoadingSkeleton: ComponentStory<typeof AccountLoading> = () => (
  <div style={{ width: '200px' }}>
    <AccountLoading />
  </div>
);

