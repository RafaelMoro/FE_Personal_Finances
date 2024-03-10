import {
  IconButton, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RecordDrawerProps } from '../../interface';
import { AllCategoryIcons } from '../../../Icons/interface';
import { EDIT_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { setRecordToBeModified } from '../../../../../redux/slices/Records/records.slice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { addToLocalStorage } from '../../../../../utils';

import {
  CategoryIcon, AppIcon,
} from '../../../Icons';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import { ShowExpenses } from '../ShowExpenses';
import { Chip, ParagraphBold } from '../../../../../styles';
import {
  RecordDrawerContainer, RecordDrawerTitle,
  RecordDrawerDescription, DrawerChipContainer,
  RecordDrawerPriceContainer,
  DrawerTitleContainer,
  DrawerCloseBox,
  DrawerDate,
  DrawerTypographyBold,
  PaymentStatusChipDrawer,
} from './RecordDrawer.styled';

const RecordDrawer = ({
  record, amountShown, expensesPaid, chipColor, onCloseCb = () => {}, openDeleteRecordModal = () => {},
}: RecordDrawerProps) => {
  const {
    shortName, description, fullDate, formattedTime,
    category, subCategory, tag, indebtedPeople, budgets, isPaid,
  } = record;
  const { icon: categoryIcon = 'foodAndDrink' } = category;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const status = isPaid ? 'Paid' : 'Unpaid';

  const handleEditRecord = () => {
    dispatch(setRecordToBeModified(record));
    // Update local storage
    addToLocalStorage({ recordToBeEdited: record });
    navigate(EDIT_RECORD_ROUTE);
  };

  return (
    <RecordDrawerContainer>
      <DrawerDate variant="body2">
        {fullDate}
        {' '}
        {formattedTime}
      </DrawerDate>
      <DrawerCloseBox>
        <IconButton onClick={onCloseCb}>
          <AppIcon icon="Close" />
        </IconButton>
      </DrawerCloseBox>
      <DrawerTitleContainer>
        { (!isMobile) && (<CategoryIcon icon={categoryIcon as keyof AllCategoryIcons} />) }
        <RecordDrawerTitle variant="h4" align="center">{shortName}</RecordDrawerTitle>
        <IconButton onClick={handleEditRecord}>
          <AppIcon icon="Edit" />
        </IconButton>
        <IconButton onClick={openDeleteRecordModal}>
          <AppIcon icon="Delete" />
        </IconButton>
      </DrawerTitleContainer>
      <RecordDrawerPriceContainer>
        { amountShown }
      </RecordDrawerPriceContainer>
      <PaymentStatusChipDrawer label={status} variant="filled" color={isPaid ? 'success' : 'error'} />
      <Typography>
        <DrawerTypographyBold component="span">Category: </DrawerTypographyBold>
        {category.categoryName}
      </Typography>
      <Typography>
        <DrawerTypographyBold component="span">Subcategory: </DrawerTypographyBold>
        {subCategory}
      </Typography>
      <RecordDrawerDescription>{description}</RecordDrawerDescription>
      { (budgets.length > 0 && (
        <DrawerChipContainer>
          <ParagraphBold>Budgets:</ParagraphBold>
          { (budgets.map((budget, index) => (
            <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" chipColor={chipColor} />
          ))) }
        </DrawerChipContainer>
      )) }
      { (tag.length > 0) && (
        <DrawerChipContainer>
          <ParagraphBold>Tags:</ParagraphBold>
          { (tag.map((individualTag, index) => (
            <Chip key={`${index + 1}-${individualTag}`} label={individualTag} variant="outlined" chipColor={chipColor} />
          ))) }
        </DrawerChipContainer>
      ) }
      { (indebtedPeople.length > 0) && (
      <ShowIndebtedPeople indebtedPeople={indebtedPeople} inRecordDrawer />
      ) }
      { (expensesPaid.length > 0) && (
      <ShowExpenses expenses={expensesPaid} isGrid />
      ) }
    </RecordDrawerContainer>
  );
};

export { RecordDrawer };
