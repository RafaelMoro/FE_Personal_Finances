import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IAccountDynamicStylesProps } from './interface';
import { AppColors, Heading4 } from '../../../styles';

const accountDynamicStyles = ({ color, bgColor }: IAccountDynamicStylesProps) => css`
  background-color: ${bgColor ?? AppColors.white};
  color: ${color ?? AppColors.black};
`;

export const AccountContainer = styled.article`
  width: 150px;
  height: 140px;
  padding: 1rem 0 1rem 1rem;
  border-radius: 1rem;
  ${accountDynamicStyles}
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
`;

export const AccountTitle = styled(Heading4)`
  margin-bottom: 1.5rem;
`;
