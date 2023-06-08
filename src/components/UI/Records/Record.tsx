import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  ListItem, Drawer,
} from '@mui/material';

import { windowSizeAtom } from '../../../atoms';
import { RecordProps } from './interface';
import { RecordDrawer } from './features/RecordDrawer';
import {
  RecordContainer, RecordDateTime, RecordContainerMobile,
  RecordTitleMobile, BudgetChipContainer, RecordCategory, RecordText,
  RecordSubCategory, RecordExpenseMobile, RecordIncomeMobile, RecordExpense,
  RecordIncome,
} from './Records.styled';
import {
  Chip, ParagraphTitle, Paragraph, FlexContainer,
} from '../../../styles';

const Record = ({
  _id, shortName, description, category, subCategory, tag = [],
  indebtedPeople = [], budgets = [],
  formattedTime, fullDate, isPaid, amount, expensesPaid = [],
}: RecordProps) => {
  const [windowSize] = useAtom(windowSizeAtom);
  const [shortViewState, setShortViewState] = useState(true);
  const [shortedName, setShortedName] = useState('');
  const [shortedDescription, setShortedDescription] = useState('');
  const firstTwoBudgets = budgets.slice(0, 2);
  const firstTwoTags = tag.slice(0, 2);

  const descriptionIsLong = description.length > 50;
  const nameIsLong = shortName.length > 80;
  const isExpense = typeof isPaid !== 'undefined';
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

  const toggleShortView = () => setShortViewState(!shortViewState);

  const amountShownMobile = isExpense
    ? (
      <RecordExpenseMobile>
        -
        {' '}
        { amount }
      </RecordExpenseMobile>
    )
    : (
      <RecordIncomeMobile>
        +
        {' '}
        { amount }
      </RecordIncomeMobile>
    );

  const amountShown = isExpense
    ? (
      <RecordExpense>
        -
        {' '}
        { amount }
      </RecordExpense>
    )
    : (
      <RecordIncome>
        +
        {' '}
        { amount }
      </RecordIncome>
    );

  if (windowSize !== 'Mobile') {
    return (
      <ListItem button onClick={toggleShortView}>
        <RecordContainer>
          <ParagraphTitle>{ shortName }</ParagraphTitle>
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          { amountShown }
          <RecordCategory>{ category }</RecordCategory>
          <RecordSubCategory>{ subCategory }</RecordSubCategory>
          <Paragraph>{ description }</Paragraph>
          <BudgetChipContainer>
            { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
          <BudgetChipContainer>
            { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
            { tag.length > 0 && tag.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
          { (indebtedPeople.length > 0 && shortViewState) && (
          <RecordText>
            People involved:
            {' '}
            {
              indebtedPeopleNames.map((personName) => (personName))
            }
          </RecordText>
          ) }
          { (!isExpense && expensesPaid.length > 0 && shortViewState) && (
            <RecordText>
              Records Paid:
              {' '}
              { expensesPaid.length }
            </RecordText>
          ) }
          <Drawer anchor="right" open={!shortViewState} onClose={toggleShortView}>
            <RecordDrawer
              shortName={shortName}
              description={description}
              fullDate={fullDate}
              formattedTime={formattedTime}
              category={category}
              subCategory={subCategory}
              indebtedPeople={indebtedPeople}
              tag={tag}
              budgets={budgets}
              amountShown={amountShown}
              expensesPaid={expensesPaid}
            />
          </Drawer>
        </RecordContainer>
      </ListItem>
    );
  }

  return (
    <ListItem button onClick={toggleShortView}>
      <RecordContainerMobile>
        <RecordTitleMobile>{ (nameIsLong) ? shortedName : shortName }</RecordTitleMobile>
        <FlexContainer justifyContent="center" gap="1">
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          <RecordText>{ category }</RecordText>
          <RecordText>{ subCategory }</RecordText>
        </FlexContainer>
        <FlexContainer justifyContent="center" gap="1">
          <BudgetChipContainer>
            { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
            { budgets.length > 0 && firstTwoBudgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
            ))}
            { budgets.length > 2 && (
            <Chip label={`Remaining budgets: ${budgets.length}`} variant="outlined" color="primary" />
            ) }
          </BudgetChipContainer>
          <BudgetChipContainer>
            { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
            { tag.length > 0 && firstTwoTags.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
            ))}
            { tag.length > 2 && (
            <Chip label={`Remaining tags: ${tag.length}`} variant="outlined" color="primary" />
            ) }
          </BudgetChipContainer>
        </FlexContainer>
        { amountShownMobile }
        <Paragraph>{ (descriptionIsLong) ? shortedDescription : description }</Paragraph>
        { (indebtedPeople.length > 0 && shortViewState) && (
          <RecordText>
            People involved:
            {' '}
            {
              indebtedPeopleNames.map((personName) => (personName))
            }
          </RecordText>
        ) }
        { (!isExpense && expensesPaid.length > 0 && shortViewState) && (
        <RecordText>
          Records Paid:
          {' '}
          { expensesPaid.length }
        </RecordText>
        ) }
        <Drawer anchor="bottom" open={!shortViewState} onClose={toggleShortView}>
          <RecordDrawer
            shortName={shortName}
            description={description}
            fullDate={fullDate}
            formattedTime={formattedTime}
            category={category}
            subCategory={subCategory}
            indebtedPeople={indebtedPeople}
            tag={tag}
            budgets={budgets}
            amountShown={amountShownMobile}
            expensesPaid={expensesPaid}
          />
        </Drawer>
      </RecordContainerMobile>
    </ListItem>
  );
};

export { Record };
