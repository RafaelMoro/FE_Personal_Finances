import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  grid-column: 1 / 3;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
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
