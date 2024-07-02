import { render, screen } from '@testing-library/react';
import { MainRecordData } from './MainRecordData';

const amountShown = <p>$49.00</p>;
const categoryIcon = <p>Icon</p>;

describe('MainRecordDataBox', () => {
  test('Show a title, amount and children', () => {
    render(
      <MainRecordData amountShown={amountShown} categoryIcon={categoryIcon} shortName="Some title">
        <p>Children of this component</p>
      </MainRecordData>,
    );
    expect(screen.getByText('Some title')).toBeInTheDocument();
    expect(screen.getByText('$49.00')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Children of this component')).toBeInTheDocument();
  });
});
