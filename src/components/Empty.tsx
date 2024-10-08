import React from "react";
import { Link } from "react-router-dom";
import { faFilm, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Empty: React.FC<{ type: string }> = ({ type }) => (
    <>
        {type === "home" ? (
            <div className="main-movie-container" id="main-movie-container">
                <div className="exploring">
                    <FontAwesomeIcon 
                        className="film-icon" 
                        icon={faFilm} 
                        data-testid="film-icon"
                    />
                    <p>Start exploring</p>
                </div>
            </div>
        ) :
        <div className = "watchlist-center">
            <p>Your watchlist is looking a little empty...</p>
            <div className = "add-movies">
                <Link to="/">
                    <FontAwesomeIcon style={{marginBottom: "2px"}} icon={faCirclePlus} />
                </Link>
                    <p>Lets add some movies!</p>
            </div>
        </div>
        }
    </>
);

export default Empty;
