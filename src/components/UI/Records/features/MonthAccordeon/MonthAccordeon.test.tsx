import { render, screen } from '@testing-library/react';
import { MonthAccordeon } from './MonthAccordeon';

describe('<MonthAccordeon />', () => {
  const title = 'January';
  test('Show month accordeon', () => {
    render(
      <MonthAccordeon title={title} color="blue" accountId="1">
        <div>Child Content</div>
      </MonthAccordeon>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
  });

  test('Show month accordeon opened', () => {
    render(
      <MonthAccordeon title={title} color="blue" accountId="1" opened>
        <div>Child Content</div>
      </MonthAccordeon>,
    );

    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
  });
});
