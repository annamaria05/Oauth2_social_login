import React from 'react';
import './LoadingIndicator.css';

// Componente funzionale LoadingIndicator
export default function LoadingIndicator(props) {
    return (
        // Container del loading indicator
        <div className="loading-indicator-container">
            {/* Contenuto del loading indicator */}
            <div className="loading-indicator">
                <span>Loading...</span>
                {/* Spinner animato */}
                <div className="spinner"></div>
            </div>
        </div>
    );
}
