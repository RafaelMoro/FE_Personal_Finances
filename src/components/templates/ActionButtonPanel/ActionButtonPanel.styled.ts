import styled from '@emotion/styled';
import {
  AnchorButton, CancelButton, PrimaryButton, responsiveBreakpoints,
} from '../../../styles';
import { ButtonPanelProps } from './interface';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AnchorButtonForm = styled(AnchorButton)`
  display: flex;
  order: 2;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 1;
  }
`;

export const CancelButtonForm = styled(CancelButton, { shouldForwardProp: (props) => props !== 'minWidth' })`
  min-width: ${({ minWidth }: ButtonPanelProps) => minWidth}rem;
`;

export const PrimaryButtonForm = styled(PrimaryButton, { shouldForwardProp: (props) => props !== 'minWidth' })`
  min-width: ${({ minWidth }: ButtonPanelProps) => minWidth}rem;
  order: 1;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 2;
  }
`;
