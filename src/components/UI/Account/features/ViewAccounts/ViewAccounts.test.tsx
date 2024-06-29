import { UserInitialState } from '../../../../../redux/slices/User/interface';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ViewAccounts } from './ViewAccounts';

const userInitialState: UserInitialState = {
  userInfo: {
    bearerToken: 'The bearer token',
    accessToken: 'The access token',
    user: {
      email: 'email@email.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      sub: 'sub-user-id-123',
    },
  },
};

describe('ViewAccounts', () => {
  test('Show accounts', () => {
    renderWithProviders(<ViewAccounts hide={null} />, { preloadedState: { user: userInitialState } });
  });
});
