import { AccountContainerLoading, AccountSkeletonHolder } from '../../Account.styled';

const AccountLoading = () => (
  <AccountContainerLoading data-testid="account-loading-skeleton">
    <AccountSkeletonHolder data-testid="account-loading-skeleton-placeholder" />
    <AccountSkeletonHolder data-testid="account-loading-skeleton-placeholder" />
    <AccountSkeletonHolder data-testid="account-loading-skeleton-placeholder" />
  </AccountContainerLoading>
);

export { AccountLoading };
