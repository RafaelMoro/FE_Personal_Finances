import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Button,
  Chip as ChipMUI,
  DialogTitle as DialogTitleMUI,
  ListItemText as ListItemTextMUI,
  InputLabel as InputLabelMUI,
  Select as SelectMUI,
  MenuItem as MenuItemMUI,
  TableCell as TableCellMUI,
} from '@mui/material';
import { TextField } from 'formik-mui';
import { Link } from 'react-router-dom';

import { dynamicPadding } from './DynamicStyles.styled';
import { AppColors } from './GlobalConfigObjects';
import { createResponsiveProps } from './createResponsiveProps';
import { FlexContainerProps } from './interface';

/*
* This file has generic emotion components to use accross the application and
* global css styles
*/

export const GlobalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, p {
    line-height: 1.5;
  }
  #root {
    position: relative;
    z-index: 1;
  }
  .MuiFormHelperText-root {
    ${createResponsiveProps({ fontSize: 'Sub', important: true })}
  }
  .MuiTableCell-root {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

// **** Containers

const flexContainerStyles = ({
  justifyContent, alignItems, gap, flexDirection,
}: FlexContainerProps) => css`
  justify-content: ${justifyContent ?? 'start'};
  align-items: ${alignItems ?? 'start'};
  gap: ${gap ?? '0'}rem;
  flex-direction: ${flexDirection ?? 'row'};
`;

export const FlexContainer = styled.div`
  display: flex;
  ${flexContainerStyles}
`;

// **** Buttons

export const PrimaryButton = styled(Button)`
  ${createResponsiveProps({ fontSize: 'P' })}
  background-color: ${AppColors.primary};

  &:hover {
    background-color: ${AppColors.bgColorDark};
  }
`;

export const SecondaryButton = styled(Button)`
  ${createResponsiveProps({ fontSize: 'P' })}
  background-color: ${AppColors.white};
  color: ${AppColors.primary};
  border: .1rem solid ${AppColors.primary};

  &:hover {
    background-color: ${AppColors.primary};
    color: ${AppColors.white};
  }
`;

export const CancelButton = styled(Button)`
  ${createResponsiveProps({ fontSize: 'P' })}
  background-color: ${AppColors.negative};
  color: ${AppColors.white};

  &:hover {
    background-color: ${AppColors.negativeDarker};
    color: ${AppColors.white};
  }
`;

// **** Headings

export const Heading1 = styled.h1`
  ${createResponsiveProps({ fontSize: 'H1', fontWeight: 'bold' })}
`;

export const Heading2 = styled.h2`
  ${createResponsiveProps({ fontSize: 'H2', fontWeight: 'bold' })}
`;

export const Heading3 = styled.h3`
  ${createResponsiveProps({ fontSize: 'H3' })}
`;

export const Heading4 = styled.h4`
  ${createResponsiveProps({ fontSize: 'H4' })}
`;

// **** Paragraphs

export const ParagraphTitle = styled.p`
  ${createResponsiveProps({ fontSize: 'H4', fontWeight: '500' })}
`;

export const Sub = styled.p`
  ${createResponsiveProps({ fontSize: 'Sub' })}
`;

export const Paragraph = styled.p`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const Anchor = styled(Link)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const AnchorButton = styled(Link)`
  text-decoration: none;
  ${createResponsiveProps({ fontSize: 'P' })}
  ${dynamicPadding}
`;

export const DialogTitle = styled(DialogTitleMUI)`
  ${createResponsiveProps({ fontSize: 'H2' })}
`;

export const ListItemText = styled(ListItemTextMUI)`
  span {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

// Tables

export const TableCell = styled(TableCellMUI)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

// **** Input and Forms

export const InputForm = styled(TextField)`
  input {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  label {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

export const InputLabel = styled(InputLabelMUI)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const Select = styled(SelectMUI)`
  div {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

// **** Miscelanea

export const MenuItem = styled(MenuItemMUI)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const Chip = styled(ChipMUI)`
  span {
    ${createResponsiveProps({ fontSize: 'Sub' })}
  }
`;
