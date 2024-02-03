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
  RecordCategory, RecordSubtitleText, RecordSubCategory, RecordExpense,
  RecordIncome, RecordStatusContainer, RecordDescription, RecordStatus, StatusWhiteCircle,
  ListItemRecord, BudgetChipContainer, TagsChipContainer, RecordTitle, RecordText, RecordDate, RecordTime, RecordSub,
} from './Records.styled';

const Record = ({ record, backgroundColor }: RecordProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id, shortName, description, category, subCategory, tag = [],
    indebtedPeople = [], budgets = [],
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

  const descriptionIsLong = description.length > 50;
  const nameIsLong = shortName.length > 80;
  const isExpense = typeof isPaid !== 'undefined';
  const status = isPaid ? 'Expense Paid' : 'Expense Not Paid';
  const indebtedPeopleNames = indebtedPeople.map((person, index) => {
    if (index === indebtedPeople.length - 1) return person.name;
    return `${person.name} - `;
  });

  useEffect(() => {
    if (descriptionIsLong) {
      const descriptionSliced = description.slice(0, 50);
      const descriptionWithEllipsis = descriptionSliced.concat('...');
      setShortedDescription(descriptionWithEllipsis);
    }
  }, [description, descriptionIsLong]);

  useEffect(() => {
    if (nameIsLong) {
      const nameSliced = shortName.slice(0, 80);
      const nameWithEllipsis = nameSliced.concat('...');
      setShortedName(nameWithEllipsis);
    }
  }, [nameIsLong, shortName]);

  const showLongView = () => setOpenLongView(true);
  const hideLongView = () => setOpenLongView(false);

  const amountShown = isExpense
    ? (
      <RecordExpense>
        -
        {' '}
        { amountFormatted }
      </RecordExpense>
    )
    : (
      <RecordIncome>
        +
        {' '}
        { amountFormatted }
      </RecordIncome>
    );

  if (windowSize !== 'Mobile') {
    return (
      <>
        <ListItemRecord onClick={showLongView}>
          <RecordTitle align="center">{ shortName }</RecordTitle>
          { amountShown }
          <RecordDate>{ fullDate }</RecordDate>
          <RecordTime>{ formattedTime }</RecordTime>
          <RecordDescription>{ description }</RecordDescription>
          <RecordCategory>{ category.categoryName }</RecordCategory>
          <RecordSubCategory>{ subCategory }</RecordSubCategory>
          { (isExpense && isCredit) && (
          <RecordStatusContainer>
            <RecordStatus isPaid={isPaid ?? true}>
              <StatusWhiteCircle />
              <Typography>{status}</Typography>
            </RecordStatus>
          </RecordStatusContainer>
          ) }
          <BudgetChipContainer>
            { budgets.length === 0 && (<RecordSubtitleText>No budgets</RecordSubtitleText>) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
            ))}
          </BudgetChipContainer>
          <TagsChipContainer>
            { tag.length === 0 && (<RecordSubtitleText>No tags</RecordSubtitleText>) }
            { tag.length > 0 && tag.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" chipColor={backgroundColor} />
            ))}
          </TagsChipContainer>
          { (indebtedPeople.length > 0 && !openLongView) && (
            <RecordSubtitleText>
              People involved:
              {' '}
              {
              indebtedPeopleNames.map((personName) => (personName))
            }
            </RecordSubtitleText>
          ) }
          { (!isExpense && expensesPaid.length > 0 && !openLongView) && (
            <RecordSubtitleText>
              Records Paid:
              {' '}
              { expensesPaid.length }
            </RecordSubtitleText>
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
        <RecordTitle align="center">{ (nameIsLong) ? shortedName : shortName }</RecordTitle>
        { amountShown }
        <RecordDate>{ fullDate }</RecordDate>
        <RecordTime>{ formattedTime }</RecordTime>
        <RecordSub>{ category.categoryName }</RecordSub>
        <RecordSub>{ subCategory }</RecordSub>
        <BudgetChipContainer>
          { budgets.length === 0 && (<RecordSubtitleText>No budgets</RecordSubtitleText>) }
          { budgets.length > 0 && firstTwoBudgets.map((budget) => (
            <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
          ))}
          { budgets.length > 2 && (
          <Chip label={`Remaining budgets: ${budgets.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </BudgetChipContainer>
        <TagsChipContainer>
          { tag.length === 0 && (<RecordSubtitleText>No tags</RecordSubtitleText>) }
          { tag.length > 0 && firstTwoTags.map((item) => (
            <Chip key={`${_id}-${item}`} label={item} variant="outlined" chipColor={backgroundColor} />
          ))}
          { tag.length > 2 && (
          <Chip label={`Remaining tags: ${tag.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </TagsChipContainer>
        <RecordDescription>{ (descriptionIsLong) ? shortedDescription : description }</RecordDescription>
        { (indebtedPeople.length > 0 && !openLongView) && (
        <RecordText>
          People involved:
          {' '}
          {
                indebtedPeopleNames.map((personName) => (personName))
              }
        </RecordText>
        ) }
        { (!isExpense && expensesPaid.length > 0 && !openLongView) && (
          <RecordText>
            Records Paid:
            {' '}
            { expensesPaid.length }
          </RecordText>
        ) }
        { (isExpense && isCredit) && (
          <RecordStatusContainer>
            <RecordStatus isPaid={isPaid ?? true}>
              <StatusWhiteCircle />
              <Typography>{status}</Typography>
            </RecordStatus>
          </RecordStatusContainer>
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
