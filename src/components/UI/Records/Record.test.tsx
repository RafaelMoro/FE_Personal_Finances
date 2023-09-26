import { render, screen } from '@testing-library/react';
import { Record } from './Record';
import { AnyRecord } from '../../../globalInterface';

const records: AnyRecord[] = [
  {
    _id: '123-456',
    shortName: 'Casa a solesta gym',
    // eslint-disable-next-line max-len
    description: 'Esta es una descripcion muy larga para darme una idea de cuanto debo de cortar aproximadamente para la vista corta y la vista larga',
    category: {
      _id: '123-456-789',
      __v: 0,
      categoryName: 'Category dummy',
      subCategories: ['foo', 'var'],
    },
    subCategory: 'Didi/Uber',
    tag: [],
    date: new Date(),
    indebtedPeople: [
      {
        name: 'Beto',
        amount: 30,
        amountPaid: 0,
        isPaid: false,
      },
      {
        name: 'George',
        amount: 70,
        amountPaid: 50,
        isPaid: false,
      },
      {
        name: 'Dad',
        amount: 150,
        amountPaid: 150,
        isPaid: true,
      },
    ],
    budgets: [],
    formattedTime: '12:34pm',
    fullDate: 'May 20',
    amount: 150.09,
    amountFormatted: '$150.09',
    account: '123-456-789',
    isPaid: false,
  },
  {
    _id: '456-789',
    shortName: 'Solesta gym a casa',
    description: 'Didi para ir a casa',
    date: new Date(),
    category: {
      _id: '123-456-789',
      __v: 0,
      categoryName: 'Category dummy',
      subCategories: ['foo', 'var'],
    },
    subCategory: 'Didi/Uber',
    tag: [],
    indebtedPeople: [],
    budgets: [],
    formattedTime: '1:50pm',
    fullDate: 'May 20',
    amount: 110.24,
    amountFormatted: '$110.24',
    account: '123-456-789',
    expensesPaid: [
      {
        _id: '64600b8f2bb57b9d17843d87',
        shortName: 'Chilaquiles',
        amount: '$96.03',
        fullDate: 'May 20',
        formattedTime: '1:50pm',
      },
      {
        _id: '64600b8f2bb57b9d17843d87',
        shortName: 'Chilaquiles',
        amount: '$96.03',
        fullDate: 'May 20',
        formattedTime: '1:50pm',
      },
    ],
  },
];

describe('<Records />', () => {
  test('Render expense in Mobile', () => {
    const expense = records[0];
    render(
      <Record
        _id={expense._id}
        shortName={expense.shortName}
        description={expense.description}
        category={expense.category}
        subCategory={expense.subCategory}
        tag={expense.tag}
        indebtedPeople={expense.indebtedPeople}
        budgets={expense.budgets}
        fullDate={expense.fullDate}
        formattedTime={expense.formattedTime}
        amount={expense.amount}
        isPaid={expense.isPaid}
        expensesPaid={expense.expensesPaid}
        date={expense.date}
        account={expense.account}
        amountFormatted={expense.amountFormatted}
      />,
    );

    expect(screen.getByText(/casa a solesta gym/i)).toBeInTheDocument();
    expect(screen.getByText(/esta es una descripcion muy larga para darme una i.../i)).toBeInTheDocument();
    expect(screen.getByText(/- \$150\.09/i)).toBeInTheDocument();
    expect(screen.getByText('May 20')).toBeInTheDocument();
    expect(screen.getByText('12:34pm')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Didi/Uber')).toBeInTheDocument();
    expect(screen.getByText('No Budget')).toBeInTheDocument();
    expect(screen.getByText('No Tags')).toBeInTheDocument();
  });

  test('Render income in Mobile', () => {
    const income = records[1];
    render(
      <Record
        _id={income._id}
        shortName={income.shortName}
        description={income.description}
        category={income.category}
        subCategory={income.subCategory}
        tag={income.tag}
        indebtedPeople={income.indebtedPeople}
        budgets={income.budgets}
        fullDate={income.fullDate}
        formattedTime={income.formattedTime}
        amount={income.amount}
        isPaid={income.isPaid}
        expensesPaid={income.expensesPaid}
        date={income.date}
        account={income.account}
        amountFormatted={income.amountFormatted}
      />,
    );

    expect(screen.getByText(/solesta gym a casa/i)).toBeInTheDocument();
    expect(screen.getByText(/didi para ir a casa/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ \$110\.24/i)).toBeInTheDocument();
    expect(screen.getByText('May 20')).toBeInTheDocument();
    expect(screen.getByText(/1:50pm/i)).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Didi/Uber')).toBeInTheDocument();
    expect(screen.getByText('No Budget')).toBeInTheDocument();
    expect(screen.getByText('No Tags')).toBeInTheDocument();
    expect(screen.getByText(/records paid: 2/i)).toBeInTheDocument();
  });
});
