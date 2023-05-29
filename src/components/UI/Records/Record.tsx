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
  formattedTime, fullDate, isPaid, amount,
}: RecordProps) => {
  const [windowSize] = useAtom(windowSizeAtom);
  const [shortViewState, setShortViewState] = useState(true);
  const [shortedDescription, setShortedDescription] = useState('');

  const descriptionIsLong = description.length > 50;
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
            />
          </Drawer>
        </RecordContainer>
      </ListItem>
    );
  }

  return (
    <ListItem button onClick={toggleShortView}>
      <RecordContainerMobile>
        <RecordTitleMobile>{ shortName }</RecordTitleMobile>
        <FlexContainer justifyContent="center" gap="1">
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          <RecordText>{ category }</RecordText>
          <RecordText>{ subCategory }</RecordText>
        </FlexContainer>
        <FlexContainer justifyContent="center" gap="1">
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
          />
        </Drawer>
      </RecordContainerMobile>
    </ListItem>
  );
};

export { Record };
