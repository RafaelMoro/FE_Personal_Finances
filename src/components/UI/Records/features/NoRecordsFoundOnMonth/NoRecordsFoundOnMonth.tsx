import { Paragraph } from '../../../../../styles';

interface NoRecordsFoundOnMonthProps {
  month: string;
  accountTitle: string;
}

const NoRecordsFoundOnMonth = ({
  month, accountTitle,
}: NoRecordsFoundOnMonthProps) => (
  <Paragraph align="center">
    There are no records in
    {' '}
    { month }
    {' '}
    for the account:
    {' '}
    &quot;
    {accountTitle}
    &quot;
    .
  </Paragraph>
);

export { NoRecordsFoundOnMonth };
