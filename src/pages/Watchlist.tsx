import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Movie from "../components/Movie";
import { MovieInterface } from "../interfaces/MovieInterface";
import Empty from "../components/Empty";

const API_BASE: string = "http://localhost:3001";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<MovieInterface[]>([]);


  function getMovieInfo(): void {
    fetch(API_BASE + "/watchlist")
      .then((res) => res.json())
      .then((data: MovieInterface[]) => setWatchlist(data))
      .catch((err) => console.error("Error: ", err));
  }

  async function removeMovie (id: string) {
    const data = await fetch(API_BASE + '/watchlist/delete/' + id, {
      method: "DELETE"
    }).then(res => res.json())
      .catch(err => console.error("Error: ", err))
    setWatchlist(movies => movies.filter(movie => movie._id != data._id))
  }

  useEffect(() => {
    getMovieInfo();
  }, []);

  return (
    <div>
      <Nav />
      {
        watchlist.length 
        ? 
          watchlist.map((movie, i) => (
            <Movie handleClick={removeMovie} key={i} movieInfo={movie} WatchlistPage={true} />
          ))
        : 
        <Empty 
          type="Watchlist"
        />
      }
    </div>
  );
}