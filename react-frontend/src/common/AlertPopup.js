import React from 'react';
import './AlertPopup.css';

// Componente funzionale AlertPopup
const AlertPopup = ({ show, message, onOkClick }) => {
    return (
        // Mostra il popup solo se la prop "show" è true
        show ? (
            <div className="popup">
                {/* Contenuto del popup */}
                <div className="popup-content">
                    <p>{message}</p>
                    {/* Pulsante "Ok" con gestione dell'evento onClick */}
                    <button onClick={onOkClick}>Ok</button>
                </div>
            </div>
        ) : null
    );
};

export default AlertPopup;
