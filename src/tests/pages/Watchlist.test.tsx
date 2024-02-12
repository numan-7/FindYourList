import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { server } from '../../mockHandlers';

import Watchlist from '../../pages/Watchlist';

test('renders movies from watchlist', async () => {
  render(<Watchlist />);  
  await waitFor(() => screen.getByText('The Avengers'));
  expect(screen.getByText('The Avengers')).toBeInTheDocument();
});

test('removes movie from watchlist', async () => {
  render(<Watchlist />);
  await waitFor(() => screen.getByText('The Avengers'));
  const removeButton = screen.getByTestId('remove-icon');
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton)
  await waitFor(() => expect(screen.queryByText('The Avengers')).toBeNull());
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());