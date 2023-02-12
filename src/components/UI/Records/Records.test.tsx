import { render, screen } from '@testing-library/react';
import { Records } from './Records';

const record = {
  shortName: 'Uber home to gym',
  description: 'Paying Uber to go to smartfit on Solesta',
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
    render(<Records
      shortName={record.shortName}
      description={record.description}
      recordType="Expense"
      price={record.price}
      budgets={record.budgets}
      date={new Date()}
    />);

    expect(screen.getByText('Uber home to gym')).toBeInTheDocument();
    expect(screen.getByText('Paying Uber to go to smartfit on Solesta')).toBeInTheDocument();
    expect(screen.getByText('$168.02')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
  });
});
