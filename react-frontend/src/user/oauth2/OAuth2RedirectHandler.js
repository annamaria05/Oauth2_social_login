import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom';

class OAuth2RedirectHandler extends Component {

    // Metodo per ottenere il valore di un parametro dall'URL
    getUrlParameter(name) {
        // Sostituisce le parentesi quadre con la loro rappresentazione nell'espressione regolare
        name = name.replace(/\[/, '\\[').replace(/]/, '\\[');
        // Crea un'espressione regolare per cercare il parametro nell'URL
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        // Esegue la regex sull'URL e ottiene i risultati
        var results = regex.exec(this.props.location.search);
        // Restituisce il valore del parametro, decodificato se presente, altrimenti una stringa vuota
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    componentDidMount() {
        window.location.reload();
    }

    render() {
        // Ottiene il token e l'eventuale errore dai parametri dell'URL
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        // Se è presente un token, lo salva nel localStorage e reindirizza alla home
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }} />;
        } else {
            // Se c'è un errore, reindirizza alla pagina di login con un messaggio di errore
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }} />;
        }
    }
}

export default OAuth2RedirectHandler;
