import React, { Component } from 'react';
import { getCurrentUser, saveNotes } from '../util/APIUtils';
import './Home.css';
import imageHome from '../img/Img_home.png';
import AlertPopup from "../common/AlertPopup";

class Home extends Component {
    constructor(props) {
        super(props);

        // Inizializza lo stato del componente
        this.state = {
            loading: true,
            user: null,
            note: '',
            previousNote: '',
            isPopupOpen: false,
            popupMessage: ''
        };

        // Associa i metodi di gestione degli eventi al contesto corrente
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveNotes = this.handleSaveNotes.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        // Si ottengono le informazioni sull'utente corrente quando il componente viene montato
        getCurrentUser()
            .then(response => {
                // Aggiorna lo stato con le informazioni dell'utente
                this.setState({
                    loading: false,
                    user: response,
                    note: response.note,
                    previousNote: response.note || '' /* Imposta la nota precedente
                                                         o una stringa vuota se non c'è alcuna nota precdente*/
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    user: null
                });
            });
        // Nascondere barra di scorrimento
        document.body.style.overflow = 'hidden';
    }

    handleInputChange(event) {
        // Gestione del cambiamento di valore nell'input della nota
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        // Aggiornamento dello stato con il nuovo valore dell'input
        this.setState({
            [inputName]: inputValue
        });
    }

    openPopup(message) {
        // Apertura popup impostando lo stato
        this.setState({
            isPopupOpen: true,
            popupMessage: message
        });
    }

    closePopup() {
        // Chiusura popup e reimpostazione dello stato
        this.setState({
            isPopupOpen: false,
            popupMessage: '',
            note: '' // Pulisce il valore della textarea
        }, () => {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.reload();
            }, 0.5);
        });
    }
    handleSaveNotes = () => {
        // Gestione salvataggio note
        const { note } = this.state;
        // Chiamata API per salvare le note
        saveNotes(note)
            .then(response => {
                // Se il salvataggio è riuscito, aggiornamento della nota precedente e apertura popup
                this.setState(prevState => ({
                    previousNote: prevState.note
                }));
                this.openPopup('Nota salvata correttamente!');
            })
            .catch(error => {
                this.openPopup('Errore durante il salvataggio della nota. Riprova più tardi.');
            });
    };

    render() {
        const { loading, user, previousNote, isPopupOpen, popupMessage } = this.state;

        // Se il caricamento è in corso, mostra un messaggio di caricamento
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="home-container">
                <div className="container">

                    <div className="content-wrapper">
                        <div className="image-container">
                            <img src={imageHome} alt="Checkbox" className="centered-image" />
                        </div>
                        <div className="text-content">

                            {user ? (
                                <div className="note-container">
                                    <h1 className="home-title">
                                        <b>Bentornato/a {user.name}!</b>
                                    </h1>
                                    <h2 className="h2-home">Come utilizzare NoteToDo:</h2>
                                    <p>1. Inserisci le tue note nel campo di testo situato qui in basso.</p>
                                    <p>2. Premi il pulsante "<b>Salva Note</b>" per memorizzare le tue annotazioni.</p>
                                    <p>3. La tua nota precedente sarà visualizzata nella tabella a destra.</p>
                                    <p><b>Nota bene:</b> al momento è possibile salvare una sola nota per volta.</p>
                                    <div className="profile-notes">
                                        <label htmlFor="note">Note:</label>
                                        <textarea
                                            id="note"
                                            name="note"
                                            placeholder="Inserisci le tue note qui..."
                                            className="note-input"
                                            onChange={this.handleInputChange}
                                        />
                                        <button className="button_notes" onClick={this.handleSaveNotes}><b>Salva
                                            Note</b>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="home-description">
                                    <h1 className="home-title">
                                        <b>Benvenuto su NoteToDo!</b>
                                    </h1>
                                    Sei stanco di dimenticare le cose da fare? <br/>
                                    NoteToDo è qui per aiutarti a organizzare la tua vita quotidiana in modo semplice ed
                                    efficiente. <br/> <br/>
                                    Con la nostra piattaforma intuitiva, puoi annotare facilmente le tue attività e
                                    tenere traccia di ciò che devi fare. <br/>
                                    Sia che tu stia gestendo progetti complessi o semplicemente pianificando la tua
                                    giornata, <br/> NoteToDo è la tua soluzione di gestione delle attività preferita.
                                </p>
                            )}
                        </div>
                        {user ? (
                            <div className="profile-previous-note">
                                <div className="previous-notes-table-container">
                                    <table className="previous-notes-table">
                                        <thead>
                                        <tr>
                                            <th>Nota Precedente:</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{previousNote || 'Nessuna nota precedente'}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}

                        <AlertPopup
                            show={isPopupOpen}
                            message={popupMessage}
                            onOkClick={this.closePopup}
                        />
                    </div>
                </div>
                <footer className="footer_home">
                    <div className="footer_home-content">
                        <p>&copy; 2024 NoteToDo. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Home;
