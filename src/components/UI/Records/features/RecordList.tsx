import { List, ListItem, Divider } from '@mui/material';
import { IRecordListProps } from '../interface';
import { Record } from '../Record';

const RecordList = ({ records }: IRecordListProps) => (
  <List component="nav">
    { records.length > 0 && records.map((record) => (
      <article key={record.id}>
        <ListItem button>
          <Record
            shortName={record.shortName}
            description={record.description}
            recordType={record.recordType}
            price={record.price}
            budgets={record.budgets}
            date={record.date}
          />
        </ListItem>
        <Divider />
      </article>
    )) }
  </List>
);

export { RecordList };
