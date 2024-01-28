import styled from '@emotion/styled';
import { AnchorButton, CancelButton, PrimaryButton } from '../../../styles';
import { ButtonPanelProps } from './interface';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media(min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AnchorButtonForm = styled(AnchorButton)`
  display: flex;
  order: 2;

  @media(min-width: 480px) {
    order: 1;
  }
`;

export const CancelButtonForm = styled(CancelButton)`
  min-width: ${({ minWidth }: ButtonPanelProps) => minWidth}rem;
`;

export const PrimaryButtonForm = styled(PrimaryButton)`
  min-width: ${({ minWidth }: ButtonPanelProps) => minWidth}rem;
  order: 1;

  @media(min-width: 480px) {
    order: 2;
  }
`;
