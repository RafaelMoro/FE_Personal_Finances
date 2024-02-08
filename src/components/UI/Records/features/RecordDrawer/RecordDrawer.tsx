import {
  IconButton, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RecordDrawerProps } from '../../interface';
import { addToLocalStorage } from '../../../../../utils';
import { DeleteIcon, CloseIcon, EditIcon } from '../../../Icons';
import {
  RecordDrawerContainer, RecordDrawerTitle,
  RecordDrawerDescription, DrawerChipContainer,
  RecordDrawerPriceContainer,
  DrawerTitleContainer,
  DrawerCloseBox,
} from './RecordDrawer.styled';
import { Chip } from '../../../../../styles';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import { ShowExpenses } from '../ShowExpenses';
import { EDIT_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useAppDispatch } from '../../../../../redux/hooks';
import { setRecordToBeModified } from '../../../../../redux/slices/Records/records.slice';

const RecordDrawer = ({
  record, amountShown, expensesPaid, chipColor, onCloseCb = () => {}, openDeleteRecordModal = () => {},
}: RecordDrawerProps) => {
  const {
    shortName, description, fullDate, formattedTime,
    category, subCategory, tag, indebtedPeople, budgets,
  } = record;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditRecord = () => {
    dispatch(setRecordToBeModified(record));
    // Update local storage
    addToLocalStorage({ recordToBeEdited: record });
    navigate(EDIT_RECORD_ROUTE);
  };

  return (
    <RecordDrawerContainer>
      <DrawerCloseBox>
        <IconButton onClick={onCloseCb}>
          <CloseIcon />
        </IconButton>
      </DrawerCloseBox>
      <DrawerTitleContainer>
        <RecordDrawerTitle variant="h4" align="center">{shortName}</RecordDrawerTitle>
        <IconButton onClick={handleEditRecord}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={openDeleteRecordModal}>
          <DeleteIcon />
        </IconButton>
      </DrawerTitleContainer>
      <Typography>{fullDate}</Typography>
      <Typography>{formattedTime}</Typography>
      <Typography>{category.categoryName}</Typography>
      <Typography>{subCategory}</Typography>
      <RecordDrawerPriceContainer>
        { amountShown }
      </RecordDrawerPriceContainer>
      { (budgets.length > 0 && (
        <DrawerChipContainer afterContent="Budgets">
          { (budgets.map((budget, index) => (
            <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" chipColor={chipColor} />
          ))) }
        </DrawerChipContainer>
      )) }
      { (tag.length > 0) && (
        <DrawerChipContainer afterContent="Tags">
          { (tag.map((individualTag, index) => (
            <Chip key={`${index + 1}-${individualTag}`} label={individualTag} variant="outlined" chipColor={chipColor} />
          ))) }
        </DrawerChipContainer>
      ) }
      <RecordDrawerDescription>{description}</RecordDrawerDescription>
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
