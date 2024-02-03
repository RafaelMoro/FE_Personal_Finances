import { Typography } from '@mui/material';

interface NoRecordsFoundOnMonthProps {
  month: string;
  accountTitle: string;
}

const NoRecordsFoundOnMonth = ({
  month, accountTitle,
}: NoRecordsFoundOnMonthProps) => (
  <Typography align="center">
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
  </Typography>
);

export { NoRecordsFoundOnMonth };
