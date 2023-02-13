import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddAccount } from '../features/AddAccount';

export default {
  title: 'UI/Account',
  component: AddAccount
} as ComponentMeta<typeof AddAccount>;

export const AddAccountSkeleton: ComponentStory<typeof AddAccount> = () => (
  <div style={{ width: '200px' }}>
    <AddAccount />
  </div>
);
