import { Header } from '../../components/templates';
import {
  Heading1, PrimaryButton,
} from '../../styles';
import {
  Container404, GoBackAnchor, NotFoundContainer, NotFoundImageContainer, Number404,
} from './NotFound.styled';
import notFoundImagePng from '../../assets/logo-404-png.png';
import notFoundImageWebp from '../../assets/logo-404-webp.webp';
import { useAppSelector } from '../../redux/hooks';

const NotFound = () => {
  const userReduxState = useAppSelector((state) => state.user);
  const route = userReduxState ? '/dashboard' : '/';

  return (
    <>
      { (userReduxState) && (<Header />) }
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
