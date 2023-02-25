import { screen, render } from '@testing-library/react';
import { Error } from './Error';

const errorTitle = 'Error 500';
const errorDescription = 'Please contact support or try again later.';

describe('<Error />', () => {
  test('Render Error component showing title, icon, description and children', () => {
    render(
      <Error title={errorTitle} description={errorDescription}>
        <p>This is a children of Error</p>
      </Error>,
    );
    const errorIcon = screen.getByTestId('ErrorOutlineOutlinedIcon');
    const errorTitleShown = screen.getByText(/error 500/i);
    const errorDescriptionShown = screen.getByText(/Please contact support or try again later./i);
    const errorsChildren = screen.getByText(/This is a children of Error/i);

    expect(errorIcon).toBeInTheDocument();
    expect(errorTitleShown).toBeInTheDocument();
    expect(errorDescriptionShown).toBeInTheDocument();
    expect(errorsChildren).toBeInTheDocument();
  });
  test('Render description and icon only', () => {
    render(
      <Error description={errorDescription} />,
    );
    const errorIcon = screen.getByTestId('ErrorOutlineOutlinedIcon');
    const errorDescriptionShown = screen.getByText(/Please contact support or try again later./i);

    expect(errorIcon).toBeInTheDocument();
    expect(errorDescriptionShown).toBeInTheDocument();
  });
});
