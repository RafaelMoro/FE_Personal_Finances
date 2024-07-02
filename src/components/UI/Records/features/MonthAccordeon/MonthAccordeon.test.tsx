import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MonthAccordeon } from './MonthAccordeon';

describe('<MonthAccordeon />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

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

  test('Click on month accordeon and show opened.', async () => {
    render(
      <MonthAccordeon title={title} color="blue" accountId="1">
        <div>Child Content</div>
      </MonthAccordeon>,
    );

    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandLessIcon')).not.toBeInTheDocument();
    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(await screen.findByTestId('ExpandLessIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument();
  });
});
