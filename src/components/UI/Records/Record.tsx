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
  RecordSubCategory,
} from './Records.styled';
import {
  Chip, ParagraphTitle, Paragraph, FlexContainer,
} from '../../../styles';

const Record = ({
  _id, shortName, description, category, subCategory, tag = [],
  indebtedPeople = [], budgets = [], shortView = true,
  formattedTime, fullDate, children,
}: RecordProps) => {
  const [windowSize] = useAtom(windowSizeAtom);
  const [shortViewState, setShortViewState] = useState(shortView);
  const [shortedDescription, setShortedDescription] = useState('');
  const descriptionIsLong = description.length > 50;
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

  if (windowSize !== 'Mobile') {
    return (
      <ListItem button onClick={toggleShortView}>
        <RecordContainer>
          <ParagraphTitle>{ shortName }</ParagraphTitle>
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          { children }
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
              shortView={shortView}
            >
              { children }
            </RecordDrawer>
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
        { children }
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
            shortView={shortView}
          >
            { children }
          </RecordDrawer>
        </Drawer>
      </RecordContainerMobile>
    </ListItem>
  );
};

export { Record };
