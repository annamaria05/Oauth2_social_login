import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import AlertPopup from "../../common/AlertPopup";

class Signup extends Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    constructor(props) {
        super(props);
        this.state = {
            showSuccessPopup: false
        };
    }

    showSuccessPopup = () => {
        console.log("showSuccessPopup called");
        this.props.showSignupPopup(); // Chiamata alla funzione di App.js per mostrare il popup di registrazione
        this.setState({ showSuccessPopup: true }); // Aggiungi questo se vuoi gestire anche uno stato locale per il popup di successo in Signup.js
    };
    render() {
        // Se l'utente è già autenticato, reindirizza alla home
        if (this.props.authenticated) {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: this.props.location }
                    }}
                />
            );
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title"><b>Crea il tuo account</b></h1>
                    {/* Componente per la registrazione tramite social */}
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text"><b>O</b></span>
                    </div>
                    {/* Componente per il form di registrazione */}
                    <SignupForm {...this.props} />
                    {/* Link per accedere se si ha già un account */}
                    <span className="login-link">Hai già un account? <Link to="/login">Accedi!</Link></span>
                    <AlertPopup
                        show={this.state.showSuccessPopup}
                        message="Registrazione effettuata con successo. Effettua il login per continuare!"
                        onOkClick={() => this.setState({ showSuccessPopup: false })}
                    />
                </div>
                {/* Footer */}
                <footer className="footer_signup">
                    <div className="footer_signup-content">
                        <p>&copy; 2024 NoteToDo. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

// Componente per la registrazione tramite social
class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                {/* Pulsante di registrazione con Google */}
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Registrati con Google
                </a>
                {/* Pulsante di registrazione con Facebook */}
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Registrati con Facebook
                </a>
                {/* Pulsante di registrazione con Github */}
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Registrati con Github
                </a>
            </div>
        );
    }
}

// Componente per il form di registrazione
class SignupForm extends Component {
    constructor(props) {
        super(props);
        // Stato iniziale del form
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        // Binding dei metodi del componente
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Gestisce i cambiamenti negli input del form
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    // Gestisce la sottomissione del form
    handleSubmit(event) {
        event.preventDefault();

        // Creazione di una copia dello stato per evitare modifiche dirette
        const signUpRequest = { ...this.state };

        // Chiamata API per la registrazione
        signup(signUpRequest)
            .then(response => {
                this.showSuccessPopup();
                this.props.history.push("/login");
            })
            .catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }
    showSuccessPopup = () => {
        console.log("showSuccessPopup called");
        this.props.showSignupPopup(); // Chiamata alla funzione di App.js per mostrare il popup di registrazione
    };

    render() {
        return (
            // Form di registrazione
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    {/* Campo per il nome */}
                    <input type="text" name="name"
                           className="form-control" placeholder="Nome" autoComplete="none"
                           value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    {/* Campo per l'email */}
                    <input type="email" name="email"
                           className="form-control" placeholder="Email" autoComplete="none"
                           value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    {/* Campo per la password */}
                    <input type="password" name="password"
                           className="form-control" placeholder="Password"
                           value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    {/* Pulsante di registrazione */}
                    <button type="submit" className="btn btn-block btn-primary-custom" >Registrati</button>
                </div>
            </form>
        );
    }
}

export default Signup;
