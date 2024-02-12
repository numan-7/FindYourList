import React from "react";
import { MovieInterface} from "../interfaces/MovieInterface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faStar, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

interface MovieProps {
  movieInfo: MovieInterface;
  inWatchlist?: boolean;
  WatchlistPage?: boolean;
  handleClick: (idOrMovie: any) => void;
}

const Movie: React.FC<MovieProps> = ({ movieInfo, inWatchlist, WatchlistPage, handleClick }) => {
  
  const addedElement = WatchlistPage ? (
    <>
      <FontAwesomeIcon data-testid="remove-icon" className="fa-circle-minus" icon={faCircleMinus} onClick={() => handleClick(movieInfo._id)} />
      <p>Remove</p>
    </>
    ) : inWatchlist ? (
      <>
      <p style = {{color: "#FEC654"}}>Added to watchlist</p>
      </>
    ) : (
      <>
        <FontAwesomeIcon data-testid = "add-icon" className="fa-circle-plus" icon={faCirclePlus} onClick={() => handleClick(movieInfo)}/>
        <p>Watchlist</p>
      </>
    );

  return (
    <div className="main-movie-container" id="main-movie-container">
      <div className="movie">
        <img src={movieInfo.Poster} alt={`${movieInfo.Title} Poster`} />
        <div className="movie-container">
          <div className="movie-info">
            <h1>{movieInfo.Title}</h1>
            <FontAwesomeIcon className="fa-star" icon={faStar} id="add" />
            <p>{movieInfo.imdbRating}</p>
          </div>
          <div className="movie-info">
            <p className="time">{movieInfo.Runtime}</p>
            <p className="genre">{movieInfo.Genre}</p>
            {addedElement}
          </div>
          <div className="movie-info">
            <p className="movie-desc">{movieInfo.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;