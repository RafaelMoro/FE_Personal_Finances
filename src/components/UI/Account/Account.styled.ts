import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IAccountDynamicStylesProps } from './interface';
import { AppColors, Heading4 } from '../../../styles';

const accountDynamicStyles = ({ color, bgColor, selected }: IAccountDynamicStylesProps) => css`
  background-color: ${bgColor ?? AppColors.white};
  color: ${color ?? AppColors.black};
  ${selected && 'opacity: 1;'}
`;

export const AccountContainer = styled.article`
  width: 100%;
  max-width: 300px;
  min-height: 140px;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-radius: 1rem;
  opacity: 0.7;
  ${accountDynamicStyles}
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const AccountTitle = styled(Heading4)`
  align-self: start;
  margin-bottom: 1rem;
`;
