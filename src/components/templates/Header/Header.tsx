import { IconButton } from '@mui/material';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import {
  FlexContainer, ParagraphTitle,
} from '../../../styles';
import { LogOutIcon } from '../../UI/Icons';
import { HeaderContainer } from './Header.styled';
import { BrandLogoName } from '../BrandLogoName';

const Header = () => {
  const { signOut } = useLogin();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);

  return (
    <HeaderContainer>
      <FlexContainer gap="3" alignItems="center">
        <BrandLogoName />
      </FlexContainer>
      { (windowSize === 'Desktop') && (<ParagraphTitle>Account management</ParagraphTitle>) }
      <IconButton onClick={signOut}>
        <LogOutIcon />
      </IconButton>
    </HeaderContainer>
  );
};

export { Header };
