import { Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { HeaderProps } from './interface';
import { AppIcon } from '../../UI/Icons';
import { BrandLogoName } from '../BrandLogoName';
import {
  AnchorButton,
  FlexContainer,
  PrimaryButton,
  SecondaryButton,
} from '../../../styles';
import {
  CloseIconButton, DrawerMenu, DrawerMenuLink, HeaderContainer, HeaderShadow,
} from './Header.styled';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const { signOut } = useLogin();
  const hasSignedOn = useAppSelector((state) => state.userInterface.hasSignedOn);
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  const [openHamburguerDrawer, setOpenHamburguerDrawer] = useState(false);
  const toggleHamburguerDrawer = () => setOpenHamburguerDrawer((prevState) => !prevState);

  return (
    <>
      <HeaderShadow isLandingPage={isLandingPage}>
        <HeaderContainer>
          <BrandLogoName isLandingPage={isLandingPage} />
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
          { (!hasSignedOn && isMobile) && (
            <IconButton onClick={toggleHamburguerDrawer}>
              <AppIcon icon="HamburguerMenu" />
            </IconButton>
          )}
        </HeaderContainer>
      </HeaderShadow>
      <Drawer anchor="bottom" open={openHamburguerDrawer}>
        <DrawerMenu>
          <CloseIconButton onClick={toggleHamburguerDrawer}>
            <AppIcon icon="Close" />
          </CloseIconButton>
          <DrawerMenuLink to={LOGIN_ROUTE}>
            <Typography>Log in</Typography>
          </DrawerMenuLink>
          <DrawerMenuLink to={REGISTER_ROUTE}>
            <Typography>Register</Typography>
          </DrawerMenuLink>
        </DrawerMenu>
      </Drawer>
    </>
  );
};

export { Header };
