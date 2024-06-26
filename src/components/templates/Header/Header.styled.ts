import styled from '@emotion/styled';
import { IconButton, Typography } from '@mui/material';
import { HeaderShadowProps } from './interface';
import { Anchor, AppColors, SecondaryButton } from '../../../styles';

export const HeaderShadow = styled.header`
  padding: 2rem;
  max-height: 11.3rem;
  ${(props: HeaderShadowProps) => (!props.isLandingPage && 'box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.2); margin-bottom: 2rem;')}
`;

export const HeaderContainer = styled.div`
  max-width: 153rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const LogoImageContainer = styled.picture`
  display: block;
  width: 7rem;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const GuestUserButton = styled(SecondaryButton)`
  max-height: 5rem;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${AppColors.primary};
`;

export const DrawerMenu = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  justify-items: center;
`;

export const CloseIconButton = styled(IconButton)`
  justify-self: end;
`;

export const DrawerMenuLink = styled(Anchor)`
  text-decoration: none;
  color: ${AppColors.black};
  cursor: pointer;
`;

export const GuestUserModalBox = styled.div`
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

export const GuestUserModalTitle = styled(Typography)`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: center;
  align-self: center;
`;

export const CloseModalBox = styled(IconButton)`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: end;
`;
