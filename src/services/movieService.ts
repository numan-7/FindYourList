// services/movieService.ts
import { MovieReturnInterface } from '../interfaces/MovieInterface';

const API_BASE = 'http://localhost:3000';
const OMDB_API_KEY = import.meta.env.VITE_API_KEY;

export const getWatchlist = async (token: string): Promise<MovieReturnInterface[]> => {
  try {
    const response = await fetch(`${API_BASE}/watchlist`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  } catch(err) {
    throw new Error(err as string);
  }
};

export const addMovieToWatchlist = async (movie: MovieReturnInterface, token: string, userId: string): Promise<MovieReturnInterface> => {
  const response = await fetch(`${API_BASE}/watchlist/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ movie, userId }), 
  });
  if (!response.ok) {
    throw new Error('Failed to add movie to watchlist');
  }
  return response.json();
};

export const searchMovies = async (search: string, page: number): Promise<MovieReturnInterface[]> => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}&page=${page}`);
  const data = await response.json();
  
  if (data.Search) {
    const detailedMovies = await Promise.all(
      data.Search.map(async (movie: any) => {
        const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`);
        if (!movieDetailsResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return movieDetailsResponse.json();
      })
    );
    return detailedMovies;
  }
  
  throw new Error('No movies found');
};

export const removeMovieFromWatchlist = async (id: string, token: string): Promise<MovieReturnInterface> => {
  const response = await fetch(`${API_BASE}/watchlist/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to remove movie from watchlist');
  }
  return response.json();
};
