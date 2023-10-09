import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  Drawer,
} from '@mui/material';

import { selectedAccountAtom, windowSizeAtom } from '../../../atoms';
import { RecordProps } from './interface';

import { RecordDrawer } from './features/RecordDrawer';
import { DeleteRecordModal } from './features/DeleteRecordModal';
import {
  Chip, ParagraphTitle, Paragraph,
} from '../../../styles';
import {
  RecordDateTime, ChipContainerMobile, RecordCategory, RecordSubtitleText,
  RecordSubCategory, RecordExpenseMobile, RecordIncomeMobile, RecordExpense,
  RecordIncome, RecordStatusContainer, RecordDescription, RecordStatus, StatusWhiteCircle,
  ListItemRecord, BudgetChipContainer, TagsChipContainer, RecordTitle, RecordText,
} from './Records.styled';

const Record = ({ record, backgroundColor }: RecordProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id, shortName, description, category, subCategory, tag = [],
    indebtedPeople = [], budgets = [],
    formattedTime, fullDate, isPaid, amountFormatted, expensesPaid = [],
  } = record;
  const [windowSize] = useAtom(windowSizeAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
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

  const amountShownMobile = isExpense
    ? (
      <RecordExpenseMobile>
        -
        {' '}
        { amountFormatted }
      </RecordExpenseMobile>
    )
    : (
      <RecordIncomeMobile>
        +
        {' '}
        { amountFormatted }
      </RecordIncomeMobile>
    );

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
          <ParagraphTitle>{ shortName }</ParagraphTitle>
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          { amountShown }
          <RecordCategory>{ category.categoryName }</RecordCategory>
          <RecordSubCategory>{ subCategory }</RecordSubCategory>
          { (isExpense && isCredit) && (
          <RecordStatusContainer>
            <RecordStatus isPaid={isPaid ?? true}>
              <StatusWhiteCircle />
              <Paragraph>{status}</Paragraph>
            </RecordStatus>
          </RecordStatusContainer>
          ) }
          <RecordDescription>{ description }</RecordDescription>
          <BudgetChipContainer>
            { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" chipColor={backgroundColor} />) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
            ))}
          </BudgetChipContainer>
          <TagsChipContainer>
            { tag.length === 0 && (<Chip label="No Tags" variant="outlined" chipColor={backgroundColor} />) }
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
        <Drawer variant="persistent" anchor="right" open={openLongView}>
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
        { amountShownMobile }
        <RecordDateTime>{ fullDate }</RecordDateTime>
        <RecordDateTime>{ formattedTime }</RecordDateTime>
        <RecordSubtitleText>{ category.categoryName }</RecordSubtitleText>
        <RecordSubtitleText>{ subCategory }</RecordSubtitleText>
        <ChipContainerMobile>
          { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" chipColor={backgroundColor} />) }
          { budgets.length > 0 && firstTwoBudgets.map((budget) => (
            <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" chipColor={backgroundColor} />
          ))}
          { budgets.length > 2 && (
          <Chip label={`Remaining budgets: ${budgets.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </ChipContainerMobile>
        <ChipContainerMobile>
          { tag.length === 0 && (<Chip label="No Tags" variant="outlined" chipColor={backgroundColor} />) }
          { tag.length > 0 && firstTwoTags.map((item) => (
            <Chip key={`${_id}-${item}`} label={item} variant="outlined" chipColor={backgroundColor} />
          ))}
          { tag.length > 2 && (
          <Chip label={`Remaining tags: ${tag.length - 2}`} variant="outlined" chipColor={backgroundColor} />
          ) }
        </ChipContainerMobile>
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
              <Paragraph>{status}</Paragraph>
            </RecordStatus>
          </RecordStatusContainer>
        ) }
      </ListItemRecord>
      <Drawer variant="persistent" anchor="bottom" open={openLongView}>
        <RecordDrawer
          chipColor={backgroundColor}
          onCloseCb={hideLongView}
          record={record}
          amountShown={amountShownMobile}
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
