import { render, screen } from '@testing-library/react';
import { Record } from './Record';
import { IRecord } from './interface';

const record: IRecord = {
  id: 1,
  shortName: 'Uber home to gym',
  description: 'Paying Uber to go to smartfit on Solesta',
  recordType: 'Expense',
  date: new Date(),
  price: 168.02,
  budgets: [
    {
      id: 1,
      name: 'Transport',
    },
  ],
};

describe('<Records />', () => {
  test('Render component with shortName, description, price, budget', () => {
    render(<Record
      shortName={record.shortName}
      description={record.description}
      recordType={record.recordType}
      price={record.price}
      budgets={record.budgets}
      date={record.date}
    />);

    expect(screen.getByText('Uber home to gym')).toBeInTheDocument();
    expect(screen.getByText('Paying Uber to go to smartfit on Solesta')).toBeInTheDocument();
    expect(screen.getByText('- $168.02')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
  });
});
