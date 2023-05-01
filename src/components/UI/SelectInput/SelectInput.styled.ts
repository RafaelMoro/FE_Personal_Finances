import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ISelectInputDynamicProps } from './interface';
import { MenuItem } from '../../../styles';

const accountDynamicStyles = ({ backgroundColor }: ISelectInputDynamicProps) => css`
  background-color: ${backgroundColor};
`;

export const PersonalizedMenuItem = styled(MenuItem)`
  ${accountDynamicStyles}
`;
