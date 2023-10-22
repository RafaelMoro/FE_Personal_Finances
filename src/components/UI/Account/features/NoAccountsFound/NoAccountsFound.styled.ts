import styled from '@emotion/styled';

export const NoAccountsFoundPicture = styled.picture`
  display: flex;
  justify-content: center;

  img {
    width: 20.9rem;
    height: 20.6rem;
    object-fit: contain;

    @media(min-width: 1024px) {
      width: 28.9rem;
      height: 29.6rem;
    }
  }
`;
