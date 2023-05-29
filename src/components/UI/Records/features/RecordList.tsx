import { List, Divider } from '@mui/material';
import { IRecordListProps } from '../interface';
import { Expense } from '../Expense';

const RecordList = ({ records }: IRecordListProps) => (
  <List component="nav">
    { records.length > 0 && records.map((record) => (
      <article key={record._id}>
        <Expense
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
          shortView={record.shortView}
          amount={record.amount}
          isPaid={record.isPaid}
        />
        <Divider />
      </article>
    )) }
  </List>
);

export { RecordList };
