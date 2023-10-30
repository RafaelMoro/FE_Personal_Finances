import { useAtom } from 'jotai';

import { Header } from '../../components/templates';
import { userAtom } from '../../atoms';
import {
  Heading1, PrimaryButton,
} from '../../styles';
import {
  Container404, GoBackAnchor, NotFoundContainer, NotFoundImageContainer, Number404,
} from './NotFound.styled';
import notFoundImagePng from '../../assets/logo-404-png.png';
import notFoundImageWebp from '../../assets/logo-404-webp.webp';

const NotFound = () => {
  const [user] = useAtom(userAtom);
  const route = user ? '/dashboard' : '/';

  return (
    <>
      { (user) && (<Header />) }
      <NotFoundContainer>
        <Container404>
          <Number404>4</Number404>
          <NotFoundImageContainer>
            <source srcSet={notFoundImageWebp} type="image/webp" />
            <img src={notFoundImagePng} alt="0" />
          </NotFoundImageContainer>
          <Number404>4</Number404>
        </Container404>
        <Heading1>Oops! Looks like you got lost</Heading1>
        <GoBackAnchor to={route}>
          <PrimaryButton variant="contained" size="medium">Go Back</PrimaryButton>
        </GoBackAnchor>
      </NotFoundContainer>
    </>
  );
};

export { NotFound };
