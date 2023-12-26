import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
export default function Nav() {
    return (
        <nav>
            <div className = "header-text">
                <h1>find your list</h1>
                <a href="/"> 
                    <button className = "a-wrapper">
                        <FontAwesomeIcon className = "a-icon" icon={faHouse} />                    
                        <span className = "a-watchlist">home</span>
                    </button>
                </a>
                <a href="/watchlist">
                    <button className = "a-wrapper">
                        <FontAwesomeIcon className = "a-icon" icon={faPlus} />                    
                        <span className = "a-watchlist">watchlist</span>
                    </button>
                </a>
            </div>
        </nav>
    )
    
}
