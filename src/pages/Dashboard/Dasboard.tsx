import { useEffect } from 'react';

import { useNotification } from '../../hooks/useNotification';
import { useDashboardActions } from '../../components/UI/SpeedDial/useDashboardActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateWindowSize } from '../../redux/slices/userInterface.slice';
import { handleResizeWindow } from '../../utils';
import { ViewAccounts } from '../../components/UI/Account';
import { Notification, RecordList, SpeedDial } from '../../components/UI';
import { Header } from '../../components/templates/Header';
import { useBackToTopButton } from '../../hooks/useBackToTopButton';
import { BackToTopButton } from '../../components/UI/BackToTopButton';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = useAppSelector((state) => state.accounts.accounts);
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();
  const { visible, scrollToTop } = useBackToTopButton();

  const { dashboardActions } = useDashboardActions({
    // Set it as true if accountsUI array has more than 1 item.
    hideChangeAccount: ((accountsUI && accountsUI.length < 2) || windowSize !== 'Mobile'),
    // Set it as true if accountsUI array is empty
    hideAddRecord: (accountsUI && accountsUI.length === 0),
  });

  const noAccountsCreated = accountsUI && accountsUI.length === 0;

  useEffect(() => {
    if (window.innerWidth > 480 && window.innerWidth <= 1024 && windowSize !== 'Tablet') {
      dispatch(updateWindowSize('Tablet'));
    }
    if (window.innerWidth > 1024 && windowSize !== 'Desktop') dispatch(updateWindowSize('Desktop'));

    window.addEventListener('resize', (event: UIEvent) => {
      const windowResized = handleResizeWindow(event);
      dispatch(updateWindowSize(windowResized));
    });

    return () => window.removeEventListener('resize', (event: UIEvent) => {
      const windowResized = handleResizeWindow(event);
      dispatch(updateWindowSize(windowResized));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContainer>
      {globalNotification.showNotification && (
        <Notification
          title={globalNotification.title}
          description={globalNotification.description}
          status={globalNotification.status}
          close={toggleGlobalNotification}
        />
      )}
      <Header />
      <ViewAccounts hide={noAccountsCreated} />
      <RecordsBox noAccountsCreated={noAccountsCreated}>
        <RecordList />
      </RecordsBox>
      <SpeedDial
        actions={dashboardActions}
        ariaLabelDescription="SpeedDial Accounts and Records actions"
      />
      { (visible) && (<BackToTopButton scrollToTop={scrollToTop} />) }
    </DashboardContainer>
  );
};

export { Dashboard };
