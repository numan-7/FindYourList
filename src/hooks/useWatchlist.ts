// hooks/useWatchlist.ts
import { useEffect, useState } from 'react';
import { getWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } from '../services/movieService';
import { MovieReturnInterface } from '../interfaces/MovieInterface';

export const useWatchlist = (token: string, userId: string) => {
  const [watchlist, setWatchlist] = useState<MovieReturnInterface[]>([]);
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist(token);
        setWatchlist(watchlistData);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    if (token) {
      fetchWatchlist();
    }
  }, [token, userId]);

  const addMovie = async (movie: MovieReturnInterface) => {
    try {
      const updatedMovie = await addMovieToWatchlist(movie, token, userId);
      setWatchlist((prevWatchlist) => [...prevWatchlist, updatedMovie]);
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
    }
  };

  const removeMovie = async (id: string) => {
    try {
      const removedMovie = await removeMovieFromWatchlist(id, token, userId);
      setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie._id !== removedMovie._id));
    } catch (error) {
      console.error('Error removing movie from watchlist:', error);
    }
  };

  return { watchlist, addMovie, removeMovie };
};
