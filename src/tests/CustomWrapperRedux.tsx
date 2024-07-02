import { PropsWithChildren } from 'react';
import { type RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { type RootState, type AppStore, setupStore } from '../redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

/*
* Custom render function gotten from documentation: https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
* This function receives a component and the mocked initial state of redux.
* It returns the component wrapped with the redux provider and the store instance.
* The component is rendered using render from @testing-library/react.
*/
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
