import { useEffect, useState } from 'react';
import {
  Drawer, Typography,
} from '@mui/material';

import { RecordProps } from './interface';
import { useAppSelector } from '../../../redux/hooks';
import { RecordDrawer } from './features/RecordDrawer';
import { DeleteRecordModal } from './features/DeleteRecordModal';
import {
  Chip,
} from '../../../styles';
import {
  RecordSubtitleText, RecordExpense,
  RecordIncome, RecordStatusContainer, RecordDescription,
  ListItemRecord, BudgetChipContainer, TagsChipContainer, RecordTitle, RecordText, RecordDate,
  PaymentStatusChip, TitleContainer, RecordsPaidNumber, MainRecordDataBox, RecordsPaidText,
} from './Records.styled';
import { CategoryIcon } from '../Icons';
import { MAX_LENGTH_DESCRIPTION, MAX_LENGTH_TITLE } from './constants';
import { MainRecordData } from './features/MainRecordDataBox';
import { AllCategoryIcons } from '../Icons/Icons.interface';
import { getRecordStatus } from '../../../utils/GetRecordStatus';

const Record = ({ record, backgroundColor }: RecordProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id, shortName, description, tag = [], category: { icon: categoryIcon },
    indebtedPeople = [], budgets = [], typeOfRecord,
    formattedTime, fullDate, isPaid, amountFormatted, expensesPaid = [],
  } = record;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const isCredit = selectedAccount?.accountType === 'Credit';
  const [openLongView, setOpenLongView] = useState(false);
  const [shortedName, setShortedName] = useState('');
  const [shortedDescription, setShortedDescription] = useState('');
  const firstTwoBudgets = budgets.slice(0, 2);
  const firstTwoTags = tag.slice(0, 2);

  const [openDeleteRecordModal, setOpenDeleteRecordModal] = useState(false);
  const showDeleteRecordModal = () => setOpenDeleteRecordModal(true);
  const hideDeleteRecordModal = () => setOpenDeleteRecordModal(false);

  const descriptionIsLong = description.length > MAX_LENGTH_DESCRIPTION;
  const nameIsLong = shortName.length > MAX_LENGTH_TITLE;
  // A transfer may be an expense.
  const isExpense = typeof isPaid !== 'undefined';
  const isTransferIncome = typeOfRecord === 'transfer' && !isExpense;
  const status = getRecordStatus({ isPaid, typeOfRecord });
  const indebtedPeopleNames = indebtedPeople.map((person, index) => {
    if (index === indebtedPeople.length - 1) return person.name;
    return `${person.name} - `;
  });

  useEffect(() => {
    if (descriptionIsLong) {
      const descriptionSliced = description.slice(0, MAX_LENGTH_DESCRIPTION);
      const descriptionWithEllipsis = descriptionSliced.concat('...');
      setShortedDescription(descriptionWithEllipsis);
    }
  }, [description, descriptionIsLong]);

  useEffect(() => {
    if (nameIsLong) {
      const nameSliced = shortName.slice(0, MAX_LENGTH_TITLE);
      const nameWithEllipsis = nameSliced.concat('...');
      setShortedName(nameWithEllipsis);
    }
  }, [nameIsLong, shortName]);

  const showLongView = () => setOpenLongView(true);
  const hideLongView = () => setOpenLongView(false);

  const amountShown = isExpense
    ? (
      <RecordExpense variant="subtitle1">
        -
        {' '}
        { amountFormatted }
      </RecordExpense>
    )
    : (
      <RecordIncome variant="subtitle1">
        +
        {' '}
        { amountFormatted }
      </RecordIncome>
    );

  if (windowSize !== 'Mobile') {
    return (
      <>
        <ListItemRecord onClick={showLongView}>
          <RecordDate variant="body2" align="center">
            { fullDate }
            { ' ' }
            { formattedTime }
          </RecordDate>
          <MainRecordData
            categoryIcon={<CategoryIcon icon={categoryIcon as keyof AllCategoryIcons} />}
            amountShown={amountShown}
            shortName={shortName}
          >
            { (isExpense && isCredit) && (
            <RecordStatusContainer>
              <PaymentStatusChip label={status} variant="filled" status={status} />
            </RecordStatusContainer>
            ) }
            { (isTransferIncome) && (
              <RecordStatusContainer>
                <PaymentStatusChip label={status} variant="filled" status="Transfer" />
              </RecordStatusContainer>
            )}
            { (!isExpense && expensesPaid.length > 0 && !openLongView && !isTransferIncome) && (
            <RecordSubtitleText>
              Records Paid:
              {' '}
              { expensesPaid.length }
            </RecordSubtitleText>
            ) }
          </MainRecordData>
          <RecordDescription>{ description }</RecordDescription>
          { (isTransferIncome && expensesPaid.length > 0) && (
          <RecordsPaidText>
            Records Paid:
            {' '}
            { expensesPaid.length }
          </RecordsPaidText>
          )}
          <BudgetChipContainer>
            { budgets.length === 0 && (<RecordSubtitleText variant="body2">No budgets</RecordSubtitleText>) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
            ))}
          </BudgetChipContainer>
          <TagsChipContainer>
            { tag.length === 0 && (<RecordSubtitleText variant="body2">No tags</RecordSubtitleText>) }
            { tag.length > 0 && tag.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" chipColor={backgroundColor} />
            ))}
          </TagsChipContainer>
          { (indebtedPeople.length > 0 && !openLongView) && (
            <Typography variant="body2">
              People involved:
              {' '}
              {
              indebtedPeopleNames.map((personName) => (personName))
            }
            </Typography>
          ) }
        </ListItemRecord>
        <Drawer
          anchor="right"
          open={openLongView}
        >
          <RecordDrawer
            chipColor={backgroundColor}
            onCloseCb={hideLongView}
            record={record}
            amountShown={amountShown}
            expensesPaid={expensesPaid}
            openDeleteRecordModal={showDeleteRecordModal}
          />
        </Drawer>
        <DeleteRecordModal
          closeDrawer={hideLongView}
          record={record}
          isExpense={isExpense}
          open={openDeleteRecordModal}
          onClose={hideDeleteRecordModal}
        />
      </>
    );
  }

  return (
    <>
      <ListItemRecord onClick={showLongView}>
        <RecordDate variant="body2" align="center">
          { fullDate }
          { ' ' }
          { formattedTime }
        </RecordDate>
        <MainRecordDataBox>
          <TitleContainer>
            <CategoryIcon icon={categoryIcon as keyof AllCategoryIcons} />
            <RecordTitle variant="subtitle1">{ (nameIsLong) ? shortedName : shortName }</RecordTitle>
          </TitleContainer>
          { amountShown }
          { (isExpense && isCredit) && (
          <RecordStatusContainer>
            <PaymentStatusChip label={status} variant="filled" status={status} />
          </RecordStatusContainer>
          ) }
          { (isTransferIncome) && (
          <RecordStatusContainer>
            <PaymentStatusChip label={status} variant="filled" status="Transfer" />
          </RecordStatusContainer>
          )}
          { (!isExpense && expensesPaid.length > 0 && !openLongView && !isTransferIncome) && (
          <RecordsPaidNumber>
            Records Paid:
            {' '}
            { expensesPaid.length }
          </RecordsPaidNumber>
          ) }
        </MainRecordDataBox>
        { (isTransferIncome && expensesPaid.length > 0) && (
          <RecordsPaidText>
            Records Paid:
            {' '}
            { expensesPaid.length }
          </RecordsPaidText>
        )}
        <BudgetChipContainer>
          { budgets.length === 0 && (<RecordSubtitleText variant="body2">No budgets</RecordSubtitleText>) }
          { budgets.length > 0 && firstTwoBudgets.map((budget) => (
            <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
          ))}
          { budgets.length > 2 && (
          <Chip label={`Remaining budgets: ${budgets.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </BudgetChipContainer>
        <TagsChipContainer>
          { tag.length === 0 && (<RecordSubtitleText variant="body2">No tags</RecordSubtitleText>) }
          { tag.length > 0 && firstTwoTags.map((item) => (
            <Chip key={`${_id}-${item}`} label={item} variant="outlined" chipColor={backgroundColor} />
          ))}
          { tag.length > 2 && (
          <Chip label={`Remaining tags: ${tag.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </TagsChipContainer>
        <RecordDescription>{ (descriptionIsLong) ? shortedDescription : description }</RecordDescription>
        { (indebtedPeople.length > 0 && !openLongView) && (
        <RecordText variant="body2">
          People involved:
          {' '}
          {
                indebtedPeopleNames.map((personName) => (personName))
              }
        </RecordText>
        ) }
      </ListItemRecord>
      <Drawer anchor="bottom" open={openLongView}>
        <RecordDrawer
          chipColor={backgroundColor}
          onCloseCb={hideLongView}
          record={record}
          amountShown={amountShown}
          expensesPaid={expensesPaid}
          openDeleteRecordModal={showDeleteRecordModal}
        />
      </Drawer>
      <DeleteRecordModal
        closeDrawer={hideLongView}
        record={record}
        isExpense={isExpense}
        open={openDeleteRecordModal}
        onClose={hideDeleteRecordModal}
      />
    </>
  );
};

export { Record };
