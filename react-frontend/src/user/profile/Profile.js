import React, { Component } from 'react';
import { getCurrentUser } from '../../util/APIUtils';
import './Profile.css';
import Alert from "react-s-alert";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    loading: false, // Aggiorna lo stato quando i dati dell'utente sono stati caricati con successo
                });
            })
            .catch(error => {
                Alert.error('Errore durante il recupero delle informazioni dell\'utente. Riprova più tardi.'); // Mostra un messaggio di errore in caso di problemi nel recupero dei dati dell'utente
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        const { loading } = this.state; // Estrae lo stato "loading" dallo stato del componente

        if (loading) {
            return <div>Loading...</div>; // Se ancora in fase di caricamento, visualizza un messaggio di caricamento
        }

        const { currentUser } = this.props; // Estrae l'oggetto utente corrente dalle proprietà passate al componente

        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                currentUser.imageUrl ? (
                                    // Mostra l'immagine del profilo se presente
                                    <img src={currentUser.imageUrl} alt={currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        {/* In caso contrario, mostra un avatar di testo basato sul nome dell'utente */}
                                        <span>{currentUser.name && currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            <h2>{currentUser.name}</h2>
                            <p className="profile-email">{currentUser.email}</p>
                        </div>
                    </div>
                </div>

                <footer className="footer_profile">
                    <div className="footer_profile-content">
                        <p>&copy; 2024 NoteToDo. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Profile;
