// hooks/useMovieSearch.ts
import { useState } from 'react';
import { searchMovies } from '../services/movieService';
import { MovieReturnInterface } from '../interfaces/MovieInterface';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<MovieReturnInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  const fetchMovies = async (search: string, page: number) => {
    try {
      const movieData = await searchMovies(search, page);
      setMovies(movieData);
      setHasMoreMovies(movieData.length > 0);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMoreMovies(false);
    }
  };

  const loadMoreMovies = async (search: string, action: number) => {
    const nextPage = currentPage + action;
    await fetchMovies(search, nextPage);
    setCurrentPage(nextPage);
  };

  return { movies, fetchMovies, loadMoreMovies, hasMoreMovies, currentPage };
};
