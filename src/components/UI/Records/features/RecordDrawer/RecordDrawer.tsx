import {
  IconButton, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RecordDrawerProps } from '../../interface';
import { AllCategoryIcons } from '../../../Icons/interface';
import { RecordRedux } from '../../../../../globalInterface';
import { EDIT_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { setRecordToBeModified } from '../../../../../redux/slices/Records/records.slice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { addToLocalStorage, getRecordStatus } from '../../../../../utils';

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
  TransferInformation,
} from './RecordDrawer.styled';

const RecordDrawer = ({
  record, amountShown, expensesPaid, chipColor, onCloseCb = () => {}, openDeleteRecordModal = () => {},
}: RecordDrawerProps) => {
  const {
    shortName, description, fullDate, formattedTime,
    category, subCategory, tag, indebtedPeople, budgets, isPaid, typeOfRecord,
  } = record;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isGuestUser } = useGuestUser();
  const { icon: categoryIcon = 'foodAndDrink' } = category;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const transferAccountName = (accounts ?? []).find((account) => account._id === record.transferRecord?.account)?.title;
  const isMobile = windowSize === 'Mobile';
  const isExpense = typeof isPaid !== 'undefined';
  const isTransfer = typeOfRecord === 'transfer';
  const isOrigin = isExpense && isTransfer;
  const transferText = isOrigin ? 'Transfer to:' : 'Transfer from:';
  const status = getRecordStatus({ isPaid, typeOfRecord });

  const handleEditRecord = () => {
    // Redux cannot have serialized values like date type Date
    const recordModified: RecordRedux = { ...record, date: record.date.toISOString() };
    // If it's a guest user, use a record redux, otherwise, use record.
    const newRecord = isGuestUser ? recordModified : record;
    dispatch(setRecordToBeModified(newRecord));
    // Update local storage
    addToLocalStorage({ newInfo: { recordToBeEdited: record } });
    navigate(EDIT_RECORD_ROUTE, { state: { typeOfRecord } });
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
      { (isExpense || isTransfer) && (<PaymentStatusChipDrawer label={status} variant="filled" status={status} />) }
      { (isTransfer) && (
      <TransferInformation variant="body2">
        {transferText}
        {' '}
        {transferAccountName}
      </TransferInformation>
      ) }
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
