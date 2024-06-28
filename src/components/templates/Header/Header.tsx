import { Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useLogin, useGuestUser } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { HeaderProps } from './interface';

import { AppIcon } from '../../UI/Icons';
import { BrandLogoName } from '../BrandLogoName';
import { GuestUserModal } from './GuestUserModal';
import {
  CloseIconButton, DrawerMenu, DrawerMenuLink, GuestUserButton, HeaderContainer, HeaderShadow,
} from './Header.styled';
import { AppColors } from '../../../styles';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const { signOut } = useLogin();
  const { isGuestUser } = useGuestUser();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  const [openHamburguerDrawer, setOpenHamburguerDrawer] = useState(false);
  const [openGuestUserModal, setOpenGuestUserModal] = useState(false);
  const toggleGuestUserModal = () => setOpenGuestUserModal((prevState) => !prevState);
  const toggleHamburguerDrawer = () => setOpenHamburguerDrawer((prevState) => !prevState);

  return (
    <>
      <HeaderShadow isLandingPage={isLandingPage}>
        <HeaderContainer>
          <BrandLogoName isLandingPage={isLandingPage} />
          { (windowSize === 'Desktop' && !isGuestUser && !isLandingPage) && (<Typography variant="h3">Account management</Typography>) }
          { (!isGuestUser) && (
            <IconButton aria-label="sign-out-button" onClick={signOut}>
              <AppIcon fillColor={isLandingPage ? AppColors.white : AppColors.primary} icon="LogOut" />
            </IconButton>
          ) }
          { (isGuestUser && !isMobile) && (
            <GuestUserButton
              isLandingPage={isLandingPage}
              variant="text"
              size="medium"
              onClick={toggleGuestUserModal}
            >
              Get Personalized Experience
            </GuestUserButton>
          )}
          { (!isGuestUser && isMobile) && (
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
      <GuestUserModal open={openGuestUserModal} onClose={toggleGuestUserModal} />
    </>
  );
};

export { Header };
