import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ISelectInputDynamicProps } from './interface';
import { MenuItem } from '../../../styles';

const accountDynamicStyles = ({ backgroundColor }: ISelectInputDynamicProps) => css`
  background-color: ${backgroundColor};
`;

export const PersonalizedMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
`;

export const ColorCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: solid 1px black;
  ${accountDynamicStyles}
`;
