import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
    return (
        <nav>
            <div className = "header-text">
                <h1>find your film</h1>
                <button className = "a-wrapper">
                    <FontAwesomeIcon className = "a-icon" icon={faHouse} />                    
                    <span className = "a-watchlist">home</span>
                </button>
                <button className = "a-wrapper">
                    <FontAwesomeIcon className = "a-icon" icon={faPlus} />                    
                    <span className = "a-watchlist">watchlist</span>
                </button>
            </div>
        </nav>
    )
    
}
