import React from 'react';
import "../styles/NotFound.css";

function NotFound() {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">Not Found</h1>
            <p className="notfound-message">The page you're looking for doesn't exist!</p>
        </div>
    );
}

export default NotFound;
