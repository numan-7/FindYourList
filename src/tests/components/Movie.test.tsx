import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Movie from '../../components/Movie';

const mockMovieInfo = {
  "_id": "65c9424bbc63fe39631c663d",
  "Title": "The Avengers",
  "Rated": "PG-13",
  "Runtime": "143 min",
  "Genre": "Action, Sci-Fi",
  "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  "imdbRating": "8.0",
  "imdbID": "tt0848228"
};

describe('Movie component', () => {
  test('renders watchlist button when not in watchlist and clicks', () => {
    const handleClick = vi.fn();
    const { getByTestId } = render(<Movie movieInfo={mockMovieInfo} inWatchlist={false} handleClick={handleClick} />);
    const watchlistButton = getByTestId('add-icon');
    expect(watchlistButton).toBeInTheDocument();
    fireEvent.click(watchlistButton); 
    expect(handleClick).toHaveBeenCalledWith(mockMovieInfo);
  });

  test('renders added to watchlist text when in watchlist', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Movie movieInfo={mockMovieInfo} inWatchlist={true} handleClick={handleClick} />);
    const addedText = getByText('Added to watchlist');
    expect(addedText).toBeInTheDocument();
  });

  test('renders remove button and text on watchlist page and clicks', () => {
    const handleClick = vi.fn();
    const { getByTestId } = render(<Movie movieInfo={mockMovieInfo} WatchlistPage={true} handleClick={handleClick} />);
    const removeButton = getByTestId('remove-icon');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton); 
    expect(handleClick).toHaveBeenCalledWith(mockMovieInfo._id);
  });
});
