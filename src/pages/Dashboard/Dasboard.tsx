import { useNotification } from '../../hooks/useNotification';
import { useDashboardActions } from '../../components/UI/SpeedDial/useDashboardActions';
import { useAppSelector } from '../../redux/hooks';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList, SpeedDial } from '../../components/UI';
import { Header } from '../../components/templates/Header';
import { useBackToTopButton } from '../../hooks/useBackToTopButton';
import { useSyncLoginInfo } from '../../hooks/useSyncLoginInfo';
import { BackToTopButton } from '../../components/UI/BackToTopButton';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';
import { useResizeWindow } from '../../hooks/useResizeWindow';
import { useLogin } from '../../hooks/useLogin';

const Dashboard = () => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = useAppSelector((state) => state.accounts.accounts);
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();
  const { visible, scrollToTop, toggleVisibleDesktop } = useBackToTopButton({ windowSize });
  const { isEmptyLocalStorage } = useSyncLoginInfo();
  const { signOut } = useLogin();

  if (isEmptyLocalStorage) signOut();

  const { dashboardActions, accountActions } = useDashboardActions({
    // Set it as true if accountsUI array has more than 1 item.
    hideChangeAccount: ((accountsUI && accountsUI.length < 2) || windowSize !== 'Mobile'),
    // Set it as true if accountsUI array is empty
    hideAddRecord: (accountsUI && accountsUI.length === 0),
  });
  const { handleOpenCreateAccount } = accountActions;

  const noAccountsCreated = accountsUI && accountsUI.length === 0;
  useResizeWindow();

  return (
    <>
      <Header />
      <DashboardContainer>
        {globalNotification.showNotification && (
          <Notification
            title={globalNotification.title}
            description={globalNotification.description}
            status={globalNotification.status}
            close={toggleGlobalNotification}
          />
        )}
        <ViewAccounts hide={noAccountsCreated} accountsActions={accountActions} />
        <RecordsBox id="record-box" onScroll={toggleVisibleDesktop} noAccountsCreated={noAccountsCreated}>
          <RecordList handleOpenCreateAccount={handleOpenCreateAccount} />
        </RecordsBox>
        <SpeedDial
          actions={dashboardActions}
          ariaLabelDescription="SpeedDial Accounts and Records actions"
        />
        { (visible) && (<BackToTopButton scrollToTop={scrollToTop} />) }
      </DashboardContainer>
    </>
  );
};

export { Dashboard };
