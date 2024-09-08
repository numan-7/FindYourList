import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavProps {
  handleLogout: () => void;
  user: any;
}

export default function Nav({ handleLogout, user }: NavProps) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handleGoogleLogin = () => {
    if (!user) {
      window.location.href = 'http://localhost:3000/auth/google/callback';
    }
  };

  const handleWatchlistClick = () => {
    if (!user) {
      toast("you must be logged in to view your watchlist.", {
        position: "bottom-right",
        autoClose: 1500,
        style: {
          backgroundColor: "#2e2e2f",
          color: "#FEC654",
        },
      });
      return;
    }
  };

  return (
    <nav>
      <div className="header-text">
        <h1>find your list</h1>
        <Link to="/">
          <button className="a-wrapper">
            <FontAwesomeIcon className="a-icon" icon={faHouse} />
            <span className="a-watchlist">home</span>
          </button>
        </Link>
        
        {user ? (
          <Link to="/watchlist">
            <button className="a-wrapper">
              <FontAwesomeIcon className="a-icon" icon={faPlus} />
              <span className="a-watchlist">watchlist</span>
            </button>
          </Link>
        ) : (
          <button className="a-wrapper" onClick={handleWatchlistClick}>
            <FontAwesomeIcon className="a-icon" icon={faPlus} />
            <span className="a-watchlist">watchlist</span>
          </button>
        )}

        {user ? (
          <button className="a-wrapper" onClick={handleLogout}>
            <FontAwesomeIcon className="a-icon" icon={faSignOutAlt} />
            <span className="a-watchlist">logout</span>
          </button>
        ) : (
          <button className="a-wrapper" onClick={handleGoogleLogin}>
            <FontAwesomeIcon className="a-icon" icon={faSignInAlt} />
            <span className="a-watchlist">login</span>
          </button>
        )}
      </div>
      <ToastContainer />
    </nav>
  );
}
