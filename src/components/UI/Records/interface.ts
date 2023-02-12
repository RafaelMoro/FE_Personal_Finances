export interface Budget {
  id: number;
  name: string;
}

export interface IRecordsProps {
  shortName: string;
  description: string;
  price: number;
  budgets: Budget[];
  date: Date;
}
