import { IconButton } from '@mui/material';
import { useAtom } from 'jotai';

import { useLogin } from '../../../hooks/useLogin';
import {
  FlexContainer, ParagraphTitle,
} from '../../../styles';
import { LogOutIcon } from '../../UI/Icons';
import { HeaderContainer } from './Header.styled';
import { windowSizeAtom } from '../../../atoms';
import { BrandLogoName } from '../BrandLogoName';

const Header = () => {
  const { signOut } = useLogin();
  const [windowSize] = useAtom(windowSizeAtom);

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
