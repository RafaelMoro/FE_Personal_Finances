import { Divider } from '@mui/material';

import { RecordListProps } from '../interface';
import { List } from '../Records.styled';
import { Record } from '../Record';

const RecordList = ({ records }: RecordListProps) => (
  <List>
    { records.length > 0 && records.map((record, index) => (
      <div key={record._id}>
        { (index === 0) && (<Divider />) }
        <Record
          _id={record._id}
          shortName={record.shortName}
          description={record.description}
          category={record.category}
          subCategory={record.subCategory}
          tag={record.tag}
          indebtedPeople={record.indebtedPeople}
          budgets={record.budgets}
          fullDate={record.fullDate}
          formattedTime={record.formattedTime}
          amount={record.amount}
          isPaid={record.isPaid}
          expensesPaid={record.expensesPaid}
        />
        <Divider />
      </div>
    )) }
  </List>
);

export { RecordList };
