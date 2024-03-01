import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

import { AccountDynamicStylesProps } from './interface';
import { AppColors } from '../../../styles';
import { blinkAnimation } from '../../../styles/animations/blink';
import { FormContainer } from '../../../styles/LoginModule.styled';

const accountDynamicStyles = ({
  color, selected,
}: AccountDynamicStylesProps) => css`
  border: .1rem solid ${color ?? AppColors.black};
  ${selected && 'opacity: 1;'}
`;

const selectedDynamicStyles = ({
  backgroundColor,
}: { backgroundColor: string }) => css`
  border: .1rem solid ${backgroundColor ?? AppColors.black};
`;

const AccountContainerBasicStyles = styled.article`
  min-width: 18rem;
  width: 100%;
  min-height: 14rem;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-radius: 1rem;
  opacity: 0.5;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 23rem;
  min-height: 18rem;
  background-color: ${AppColors.white};
`;

export const AddAccountContainer = styled(AccountContainerBasicStyles)`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

export const AccountTitle = styled(Typography)`
  font-weight: 500;
  align-self: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  grid-column: 1 / 3;
`;

export const AccountIconsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SelectedTextBox = styled.div`
  padding: .5rem;
  ${selectedDynamicStyles}
  border-radius: 1rem;
  display: flex;
  justify-content: center;
`;

export const AccountSkeletonHolder = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${AppColors.grey};
  border-radius: 1rem;
  place-self: center;
  ${blinkAnimation}
`;

export const AccountDialogFormContainer = styled(FormContainer)`
  margin-bottom: 2rem;
`;
