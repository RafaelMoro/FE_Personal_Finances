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
  SpeedDial as SpeedDialMUI,
  InputAdornment as InputAdornmentMUI,
  FormControlLabel as FormControlLabelMUI,
  ToggleButton as ToggleButtonMui,
  Typography,
} from '@mui/material';
import { DateTimePicker as DateTimePickerMUI } from '@mui/x-date-pickers';
import { TextField } from 'formik-mui';
import { Link } from 'react-router-dom';

import { FlexContainerProps, ChipProps } from './interface';
import { AppColors } from './GlobalConfigObjects';
import { createResponsiveProps } from './createResponsiveProps';
import { dynamicPadding } from './DynamicStyles.styled';

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

  // Calendar Header
  // Style for the week days span from M to S
  .MuiDayCalendar-header .MuiDayCalendar-weekDayLabel {
    ${createResponsiveProps({ fontSize: 'P' })}
  }

  // Style to override the years when selected other year and years are listed.
  & .MuiPickersYear-yearButton {
    ${createResponsiveProps({ fontSize: 'P', important: true })}
  }

  // Table pagination of select expenses of the select and sort table MUI
  .MuiTablePagination-selectIcon {
    width: 2rem !important;
    height: 2rem !important;
  }

  [class*='MuiInputBase-root-MuiTablePagination-select']{
    line-height: unset !important;
  }
`;

// **** Containers

const flexContainerStyles = ({
  justifyContent, alignItems, gap, flexDirection, margin, padding,
}: FlexContainerProps) => css`
  justify-content: ${justifyContent ?? 'start'};
  align-items: ${alignItems ?? 'start'};
  gap: ${gap ?? '0'}rem;
  flex-direction: ${flexDirection ?? 'row'};
  margin: ${margin ?? '0'};
  padding: ${padding ?? '0'};
`;

export const FlexContainer = styled.div`
  display: flex;
  ${flexContainerStyles}
`;

// **** Buttons

export const PrimaryButton = styled(Button)`
  background-color: ${AppColors.primary};
  color: ${AppColors.white};

  :disabled {
    color: ${AppColors.white};
    opacity: 0.7;
  }

  &:hover {
    background-color: ${AppColors.bgColorDark};
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${AppColors.white};
  color: ${AppColors.primary};
  border: .1rem solid ${AppColors.primary};

  &:hover {
    background-color: ${AppColors.primary};
    color: ${AppColors.white};
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${AppColors.negative};
  color: ${AppColors.white};

  &:hover {
    background-color: ${AppColors.negativeDark};
    color: ${AppColors.white};
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: ${AppColors.positive};
  color: ${AppColors.white};

  &:hover {
    background-color: ${AppColors.positiveDark};
    color: ${AppColors.white};
  }
`;

export const TransparentButton = styled(Button)`
  color: inherit;
`;

// **** Paragraphs

export const ErrorParagraphValidation = styled(Typography)`
  color: ${AppColors.validationError};
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
  textarea {
    line-height: 1.5;
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  label {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

export const InputAdornment = styled(InputAdornmentMUI)`
  p {
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

export const DateTimePicker = styled(DateTimePickerMUI)`
  label {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  & .MuiTypography-root .MuiDayCalendar-weekDayLabel {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  fieldset {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
  input {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

export const ToggleButton = styled(ToggleButtonMui)`
  ${createResponsiveProps({ fontSize: 'P' })}
  &.Mui-selected {
    color: ${AppColors.primary};
    background-color: ${AppColors.bgColorLight};
  }
`;

// **** Miscelanea

export const MenuItem = styled(MenuItemMUI)`
  ${createResponsiveProps({ fontSize: 'P' })}
`;

export const Chip = styled(ChipMUI, { shouldForwardProp: (props) => props !== 'chipColor' })`
  max-width: 15rem;
  color: ${({ chipColor }: ChipProps) => (chipColor ?? AppColors.primary)};
  border-color: ${({ chipColor }: ChipProps) => (chipColor ?? AppColors.primary)};

  & .MuiChip-label {
    ${createResponsiveProps({ fontSize: 'Sub' })}
  }
`;

export const MobileChip = styled(Chip)`
  height: auto;

  span {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    line-height: 1.3;
  }

  .MuiChip-label {
    display: block;
    white-space: normal;
  }
`;

export const FormControlLabel = styled(FormControlLabelMUI)`
  span {
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;

export const SpeedDialComponent = styled(SpeedDialMUI)`
  .MuiSpeedDial-fab {
    background-color: ${AppColors.primary};
  }
  .MuiSpeedDial-fab:hover {
    background-color: ${AppColors.bgColorDark};
  }
  svg {
    font-size: 2.5rem;
  }
  span {
    margin: 1rem 0 1rem 0;
    ${createResponsiveProps({ fontSize: 'P' })}
  }
`;
