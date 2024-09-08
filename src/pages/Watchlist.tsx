// pages/Watchlist.tsx

import React from 'react';
import Movie from '../components/Movie';
import Empty from '../components/Empty';
import { useWatchlist } from '../hooks/useWatchlist';

interface WatchlistProps {
  userId: string;
}

const Watchlist: React.FC<WatchlistProps> = ({ userId }) => {
  const token = localStorage.getItem('token') || ''; 
  const { watchlist, removeMovie } = useWatchlist(token, userId);

  return (
    <div>
      {watchlist.length ? (
        watchlist.map((movie, i) => (
          <Movie
            handleClick={() => removeMovie(movie._id)}
            key={i}
            movieInfo={movie}
            WatchlistPage={true}
          />
        ))
      ) : (
        <Empty type="Watchlist" />
      )}
    </div>
  );
};

export default Watchlist;
