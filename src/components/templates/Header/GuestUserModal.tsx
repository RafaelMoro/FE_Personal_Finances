import {
  Dialog,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import {
  AnchorButton, FlexContainer, PrimaryButton, SecondaryButton,
} from '../../../styles';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { CloseModalBox, GuestUserModalBox, GuestUserModalTitle } from './Header.styled';
import { AppIcon } from '../../UI/Icons';

interface GuestUserModalProps {
  open: boolean;
  onClose: () => void;
}

const GuestUserModal = ({ open, onClose }: GuestUserModalProps) => {
  const location = useLocation();
  // Save current pathname in state. When navigates to register, cancel will return into dashboard or home
  const locationState = { prevPath: location.pathname };
  return (
    <Dialog onClose={onClose} open={open}>
      <GuestUserModalBox>
        <GuestUserModalTitle variant="h3">Secure your data</GuestUserModalTitle>
        <CloseModalBox onClick={onClose}>
          <AppIcon icon="Close" />
        </CloseModalBox>
        <Typography>Save your progress by creating an account or continue your journey by signing in</Typography>
        <FlexContainer gap={3} justifyContent="space-between">
          <AnchorButton to={LOGIN_ROUTE}>
            <SecondaryButton variant="contained" size="medium">Sign in</SecondaryButton>
          </AnchorButton>
          <AnchorButton to={REGISTER_ROUTE} state={locationState}>
            <PrimaryButton variant="contained" size="medium">Register</PrimaryButton>
          </AnchorButton>
        </FlexContainer>
      </GuestUserModalBox>
    </Dialog>
  );
};

export { GuestUserModal };
