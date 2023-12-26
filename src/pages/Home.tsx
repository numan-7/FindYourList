import React from "react";
import Nav from '../components/Nav';
import { faSearch, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Movie from "../components/Movie";
import { MovieReturnInterface } from "../interfaces/MovieInterface";
import Empty from "../components/Empty";

const API_BASE: string = "http://localhost:3001";
export default function Home() {
    const [watchlist, setWatchlist] = React.useState<MovieReturnInterface[]>([])
    const [movies, setMovies] = React.useState<MovieReturnInterface[]>([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [hasMoreMovies, setHasMoreMovies] = React.useState(true)
    const [formData, setFormData] = React.useState({
        search: "",
    });

    React.useEffect(() => {
        getMovieInfo();
    }, []);
    
    function getMovieInfo(): void {
        fetch(API_BASE + "/watchlist")
          .then((res) => res.json())
          .then((data: MovieReturnInterface[]) => setWatchlist(data))
          .catch((err) => console.error("Error: ", err));
    }

    const addMovieToWatchlist = async (movie: MovieReturnInterface): Promise<void> => {
        try {
          const isMovieInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);
          if (!isMovieInWatchlist) {
            const response = await fetch(API_BASE + '/watchlist/new', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ movie })
            });
            const data = await response.json();
            setWatchlist(prevWatchlist => [...prevWatchlist, data]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchMovies = async (page: number): Promise<void> => {
        try {
          const API_KEY = import.meta.env.VITE_API_KEY;
          const movieData = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${formData.search}&page=${page}`);
          const data = await movieData.json();
      
          if (data.totalResults > 0) {
            const moviesData = await Promise.all(
              data.Search.map(async (movie: any) => {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                return response.json();
              })
            );
            setHasMoreMovies(true)
            setMovies(moviesData);
          } else {
            if(page > 1) {
                setHasMoreMovies(false)
            }
            alert("Nothing Found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
      
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setMovies([]);
        setCurrentPage(1);
        await fetchMovies(1);
    };
      
    const loadMoreMovies = async (action: number): Promise<void> => {
        try {
            const nextPage = currentPage + action;
            await fetchMovies(nextPage);
            setCurrentPage(nextPage);
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
      
    return (
        <div>
            <Nav />
            <form onSubmit={handleSubmit}>
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
            {movies.length 
                ? 
                (<>
                    {movies.map((movie, i) => (
                        <Movie
                            handleClick={() => addMovieToWatchlist(movie)}
                            key={i}
                            movieInfo={movie}
                            inWatchlist={watchlist.some((m) => m.imdbID === movie.imdbID)}
                        />
                    ))}
                    {hasMoreMovies && (
                        <div className = "btn-div">
                            <button disabled = {currentPage <= 1 ? true : false} className="load-more-btn" onClick={() => loadMoreMovies(-1)}>
                                Prev Page
                            </button>
                            <button className="load-more-btn" onClick={() => loadMoreMovies(1)}>
                                Next Page
                            </button>
                        </div>
                    )}
                </>) 
                :
                <Empty type="home" />
            }
        </div>
    );
}
