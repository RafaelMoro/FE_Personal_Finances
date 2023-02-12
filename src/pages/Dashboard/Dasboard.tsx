import { Account, Records } from '../../components/UI';

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

const Dashboard = () => (
  <div>
    <Account title="BBVA" amount={25000} accountType="Debit" bgColor="red" color="white" />
    <Records
      shortName={record.shortName}
      description={record.description}
      price={record.price}
      budgets={record.budgets}
      date={new Date()}
    />
  </div>
);

export { Dashboard };
