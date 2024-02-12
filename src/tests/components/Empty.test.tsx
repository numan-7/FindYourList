import React from 'react';
import { render } from '@testing-library/react';
import Empty from '../../components/Empty';

describe('Empty component', () => {
  it('renders start exploring message for type "home"', () => {
    const { getByText, queryByText } = render(<Empty type="home" />);
    expect(getByText('Start exploring')).toBeInTheDocument();
    expect(queryByText('Your watchlist is looking a little empty...')).not.toBeInTheDocument();
  });

  it('renders watchlist empty message for other types', () => {
    const { getByText, queryByText } = render(<Empty type="other" />);
    expect(getByText('Your watchlist is looking a little empty...')).toBeInTheDocument();
    expect(queryByText('Start exploring')).not.toBeInTheDocument();
  });

  it('renders add movies link', () => {
    const { getByText } = render(<Empty type="other" />);
    const addMoviesLink = getByText('Lets add some movies!');
    expect(addMoviesLink).toBeInTheDocument();
  });

  it('renders film icon for type "home"', () => {
    const { getByTestId } = render(<Empty type="home" />);
    expect(getByTestId('film-icon')).toBeInTheDocument();
  });

  it('does not render film icon for other types', () => {
    const { queryByTestId } = render(<Empty type="other" />);
    expect(queryByTestId('film-icon')).not.toBeInTheDocument();
  });
});
