import { render, screen } from "@testing-library/react"
import Nav from "../../components/Nav";

describe('Nav Component', () => {
  beforeEach(() => {
    render(<Nav />);
  });

  test('renders the title', () => {
    const titleElement = screen.getByText(/find your list/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders home link', () => {
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders watchlist link', () => {
    const watchlistLink = screen.getByRole('link', { name: /watchlist/i });
    expect(watchlistLink).toBeInTheDocument();
    expect(watchlistLink.closest('a')).toHaveAttribute('href', '/watchlist');
  });

  test('renders wrong link', () => {
    const nonExistentLink = screen.queryByRole('link', { name: /nonexistent/i });
    expect(nonExistentLink).not.toBeInTheDocument();
  });
  
});