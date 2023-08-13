import { Paragraph } from '../../../../../styles';

interface NoRecordsFoundProps {
  month: string;
  accountTitle: string;
}

const NoRecordsFound = ({ month, accountTitle }: NoRecordsFoundProps) => (
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

export { NoRecordsFound };
