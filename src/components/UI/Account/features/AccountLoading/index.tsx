import { AccountContainerLoading, AccountSkeletonHolder } from '../../Account.styled';

const AccountLoading = () => (
  <AccountContainerLoading>
    <AccountSkeletonHolder />
    <AccountSkeletonHolder />
    <AccountSkeletonHolder />
  </AccountContainerLoading>
);

export { AccountLoading };
