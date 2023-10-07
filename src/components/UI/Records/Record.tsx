import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  ListItem, Drawer,
} from '@mui/material';

import { selectedAccountAtom, windowSizeAtom } from '../../../atoms';
import { RecordDrawer } from './features/RecordDrawer';
import {
  RecordContainer, RecordDateTime, RecordContainerMobile,
  RecordTitleMobile, ChipContainerMobile, RecordCategory, RecordText,
  RecordSubCategory, RecordExpenseMobile, RecordIncomeMobile, RecordExpense,
  RecordIncome, ChipContainer, RecordStatusContainer, RecordDescription, RecordStatus, StatusWhiteCircle,
} from './Records.styled';
import {
  Chip, ParagraphTitle, Paragraph, FlexContainer,
} from '../../../styles';
import { DeleteRecordModal } from './features/DeleteRecordModal';
import { AnyRecord } from '../../../globalInterface';

const Record = (record: AnyRecord) => {
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
        <ListItem button onClick={showLongView}>
          <RecordContainer>
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
            <ChipContainer>
              { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
              { budgets.length > 0 && budgets.map((budget) => (
                <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
              ))}
            </ChipContainer>
            <ChipContainer>
              { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
              { tag.length > 0 && tag.map((item) => (
                <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
              ))}
            </ChipContainer>
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
          </RecordContainer>
        </ListItem>
        <Drawer variant="persistent" anchor="right" open={openLongView}>
          <RecordDrawer
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
      <ListItem button onClick={showLongView}>
        <RecordContainerMobile>
          <RecordTitleMobile>{ (nameIsLong) ? shortedName : shortName }</RecordTitleMobile>
          <FlexContainer justifyContent="center" gap="1">
            <RecordDateTime>{ fullDate }</RecordDateTime>
            <RecordDateTime>{ formattedTime }</RecordDateTime>
            <RecordText>{ category.categoryName }</RecordText>
            <RecordText>{ subCategory }</RecordText>
          </FlexContainer>
          <FlexContainer justifyContent="center" gap="1">
            <ChipContainerMobile>
              { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
              { budgets.length > 0 && firstTwoBudgets.map((budget) => (
                <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
              ))}
              { budgets.length > 2 && (
              <Chip label={`Remaining budgets: ${budgets.length - 2}`} variant="outlined" color="primary" />
              ) }
            </ChipContainerMobile>
            <ChipContainerMobile>
              { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
              { tag.length > 0 && firstTwoTags.map((item) => (
                <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
              ))}
              { tag.length > 2 && (
              <Chip label={`Remaining tags: ${tag.length - 2}`} variant="outlined" color="primary" />
              ) }
            </ChipContainerMobile>
          </FlexContainer>
          { amountShownMobile }
          <Paragraph>{ (descriptionIsLong) ? shortedDescription : description }</Paragraph>
          { (isExpense && isCredit) && (
          <RecordStatusContainer>
            <RecordStatus isPaid={isPaid ?? true}>
              <StatusWhiteCircle />
              <Paragraph>{status}</Paragraph>
            </RecordStatus>
          </RecordStatusContainer>
          ) }
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
        </RecordContainerMobile>
      </ListItem>
      <Drawer variant="persistent" anchor="bottom" open={openLongView}>
        <RecordDrawer
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
