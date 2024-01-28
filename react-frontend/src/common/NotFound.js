import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                {/* Titolo della pagina di errore */}
                <h1 className="title">
                    404
                </h1>
                {/* Descrizione della pagina di errore */}
                <div className="desc">
                    La pagina cercata non è stata trovata.
                </div>
                {/* Pulsante "Indietro" con link alla homepage */}
                <Link to="/">
                    <button className="go-back-btn btn btn-primary" type="button">
                        Indietro
                    </button>
                </Link>
            </div>
        );
    }
}

export default NotFound;
