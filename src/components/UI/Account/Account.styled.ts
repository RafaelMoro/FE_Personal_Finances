import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IAccountDynamicStylesProps } from './interface';
import { AppColors, Heading4 } from '../../../styles';
import { blinkAnimation } from '../../../styles/animations/blink';

const accountDynamicStyles = ({
  color, bgColor, selected,
}: IAccountDynamicStylesProps) => css`
  background-color: ${bgColor ?? AppColors.white};
  color: ${color ?? AppColors.black};
  ${selected && 'opacity: 1;'}
`;

const AccountContainerBasicStyles = styled.article`
  min-width: 180px;
  width: 100%;
  max-width: 30rem;
  min-height: 14rem;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-radius: 1rem;
  opacity: 0.7;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  display: grid;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
  scroll-snap-align: center;

  &:hover {
    opacity: 1;
  }
`;

export const AccountContainerColoroued = styled(AccountContainerBasicStyles)`
  ${accountDynamicStyles}
`;

export const AccountContainerLoading = styled(AccountContainerBasicStyles)`
  background-color: ${AppColors.white};
`;

export const AddAccountContainer = styled(AccountContainerBasicStyles)`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

export const AccountTitle = styled(Heading4)`
  align-self: start;
  margin-bottom: 1rem;
`;

export const AccountSkeletonHolder = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${AppColors.grey};
  border-radius: 1rem;
  place-self: center;
  ${blinkAnimation}
`;