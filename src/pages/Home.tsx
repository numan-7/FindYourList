// pages/Home.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Movie from '../components/Movie';
import Empty from '../components/Empty';
import { useWatchlist } from '../hooks/useWatchlist';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { MovieReturnInterface } from '../interfaces/MovieInterface';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  userId: string;
}

const Home: React.FC<HomeProps> = ({userId}) => {
  const [formData, setFormData] = useState({ search: '' });
  const token = localStorage.getItem('token') || ''; 

  const { watchlist, addMovie } = useWatchlist(token, userId);
  const { movies, fetchMovies, loadMoreMovies, hasMoreMovies, currentPage } = useMovieSearch();

  const isLoggedIn = userId != '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast("you must be logged in to search.", {
        position: "bottom-right",
        autoClose: 1500,
        style: {
          backgroundColor: "#2e2e2f",
          color: "#FEC654",
          fontFamily: "Poppins, sans-serif",
        },
      });
      return;
    }
    
    await fetchMovies(formData.search, 1);
  };

  return (
    <div>
      <form data-testid="search-form" onSubmit={handleSubmit}>
        <div className="search-container">
          <div className="search">
            <FontAwesomeIcon className="faSearch" icon={faSearch} />
            <input
              className="search-text"
              type="text"
              placeholder="Movie, Series, or Episode Name"
              onChange={handleChange}
              name="search"
              value={formData.search}
            />
          </div>
          <input className="search-btn" type="submit" value="Search" />
        </div>
      </form>
      {movies.length ? (
        <>
          {movies.map((movie: MovieReturnInterface, i: number) => (
            <Movie
              handleClick={() => addMovie(movie)}
              key={i}
              movieInfo={movie}
              inWatchlist={watchlist.some((m) => m.imdbID === movie.imdbID)}
            />
          ))}
          {hasMoreMovies && (
            <div className="btn-div">
              <button
                disabled={currentPage <= 1}
                className="load-more-btn"
                onClick={() => loadMoreMovies(formData.search, -1)}
              >
                Prev Page
              </button>
              <button
                data-testid="page-button"
                className="load-more-btn"
                onClick={() => loadMoreMovies(formData.search, 1)}
              >
                Next Page
              </button>
            </div>
          )}
        </>
      ) : (
        <Empty type="home" />
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
