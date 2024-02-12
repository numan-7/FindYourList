import { server } from '../../mockHandlers';
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';
describe('Home component', () => {
  
  beforeAll(() => {
    window.alert = vi.fn();
  });

  beforeEach(() => {
    render( <Home />);
  });
  
  afterEach(() => {
    cleanup();
  });
  
  const searchForMovie = async (movieName: string) => {
    const searchInput = screen.getByPlaceholderText('Movie, Series, or Episode Name');
    const searchButton = screen.getByTestId('search-form');
    await userEvent.type(searchInput, movieName);
    fireEvent.submit(searchButton);
  };
  
  test('pagination fetches and displays next page of movies', async () => {
    await searchForMovie('Avengers');
    await waitFor(() => {
      expect(screen.getAllByText(/The Avengers/i)[0]).toBeInTheDocument();
    });
    const paginationButton = screen.getByTestId('page-button');
    expect(paginationButton).toBeInTheDocument();
    userEvent.click(paginationButton);
    await waitFor(() => {
      expect(screen.getAllByText(/One Piece/i)[0]).toBeInTheDocument();
    });
  });
  

  test('renders search form and main icon', () => {
    const searchForm = screen.getByPlaceholderText('Movie, Series, or Episode Name');
    const searchButton = screen.getByText('Search');
    expect(searchForm).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('allows users to search for movies and displays results', async () => {
    await searchForMovie('Avengers');
    await waitFor(() => {
      const avengers = screen.getAllByText(/The Avengers/i)[0];
      const endgame = screen.getAllByText(/Avengers: Endgame/i)[0];
      expect(avengers).toBeInTheDocument();
      expect(endgame).toBeInTheDocument();
    });
  });

  test('test add to watchlist', async () => {
    await searchForMovie('Avengers');
    await waitFor(async () => {
      const avengers = screen.getAllByText(/The Avengers/i)[0];
      const endgame = screen.getAllByText(/Avengers: Endgame/i)[0];
      expect(avengers).toBeInTheDocument();
      expect(endgame).toBeInTheDocument();
      const addIcons = screen.getByTestId('add-icon');
      expect(addIcons).toBeInTheDocument();
      userEvent.click(addIcons);
      await waitFor(() => {
        const successMessage = screen.getByText(/added to watchlist/i);
        expect(successMessage).toBeInTheDocument();
      });
    });
  });

  test('bad search', async () => {
    await searchForMovie('NOTVALIDMOVIELOOOOOOOOOOOOOOL');
    await waitFor(() => {
      const notFoundMessage = screen.queryByText(/The Avengers/i);
      expect(notFoundMessage).not.toBeInTheDocument();
    });
  });
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());