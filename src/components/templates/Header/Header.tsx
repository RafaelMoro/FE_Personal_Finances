import { IconButton, Typography } from '@mui/material';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import {
  AnchorButton,
  FlexContainer,
  PrimaryButton,
  SecondaryButton,
} from '../../../styles';
import { AppIcon } from '../../UI/Icons';
import { HeaderContainer, HeaderShadow } from './Header.styled';
import { BrandLogoName } from '../BrandLogoName';
import { useSyncLoginInfo } from '../../../hooks/useSyncLoginInfo';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { HeaderProps } from './interface';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const { signOut } = useLogin();
  const { hasSignedOn } = useSyncLoginInfo();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  return (
    <HeaderShadow isLandingPage={isLandingPage}>
      <HeaderContainer>
        <FlexContainer gap={2} alignItems="center">
          <BrandLogoName isLandingPage={isLandingPage} />
        </FlexContainer>
        { (windowSize === 'Desktop' && hasSignedOn) && (<Typography variant="h3">Account management</Typography>) }
        { (hasSignedOn) && (
          <IconButton aria-label="sign-out-button" onClick={signOut}>
            <AppIcon icon="LogOut" />
          </IconButton>
        ) }
        { (!hasSignedOn && !isMobile) && (
          <FlexContainer gap={3} justifyContent="center">
            <AnchorButton to={LOGIN_ROUTE}>
              <SecondaryButton variant="contained" size="medium">Sign in</SecondaryButton>
            </AnchorButton>
            <AnchorButton to={REGISTER_ROUTE}>
              <PrimaryButton variant="contained" size="medium">Register</PrimaryButton>
            </AnchorButton>
          </FlexContainer>

        )}
      </HeaderContainer>
    </HeaderShadow>
  );
};

export { Header };
