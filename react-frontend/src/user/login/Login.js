import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

class Login extends Component {

    componentDidMount() {
        document.body.style.overflow = 'hidden';

        // Se il login con OAuth2 incontra un errore, l'utente viene reindirizzato
        // alla pagina /login con un errore.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        // Se l'utente è già autenticato, viene reindirizzato alla home page
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }

        return (
            // Renderizza la sezione di login
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title"><b>Accedi a NoteToDo</b></h1>
                    {/* Componente per il login tramite social media */}
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text"><b>O</b></span>
                    </div>

                    {/* Componente per il login tramite email e password */}
                    <LoginForm {...this.props} />

                    {/* Link per registrarsi se non si ha ancora un account */}
                    <span className="signup-link">Non sei registrato? <Link to="/signup">Iscriviti ora!</Link></span>
                </div>

                {/* Footer della pagina di login */}
                <footer className="footer_login">
                    <div className="footer_login-content">
                        <p>&copy; 2024 NoteToDo. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

// Componente per il login tramite social media
class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                {/* Bottone per il login con Google */}
                <a className="btn btn-block social-btn" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Accedi con Google</a>

                {/* Bottone per il login con Facebook */}
                <a className="btn btn-block social-btn" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Accedi con Facebook</a>

                {/* Bottone per il login con Github */}
                <a className="btn btn-block social-btn" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Accedi con Github</a>
            </div>
        );
    }
}

// Componente per il login tramite email e password
class LoginForm extends Component {
    // Costruttore del componente
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Metodo per gestire i cambiamenti nei campi di input
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        // Aggiorna lo stato con i nuovi valori dei campi di input
        this.setState({
            [inputName]: inputValue
        });
    }

    // Metodo per gestire l'invio del modulo di login
    handleSubmit(event) {
        // Impedisce il comportamento predefinito del modulo (il refresh della pagina)
        event.preventDefault();

        // Crea una copia dell'oggetto di stato per evitare side effects
        const loginRequest = { ...this.state };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                window.location.reload();
                this.props.history.push("/");
            })
            .catch(error => {
                if (error.status === 401) {
                    // Mostra il popup di errore se le credenziali sono errate
                    this.props.onLoginError();
                } else {
                    Alert.error((error && error.message) || 'Oops! Qualcosa è andato storto. Riprova!');
                }
            });
    }

    render() {
        return (
            // Form per il login tramite email e password
            <form onSubmit={this.handleSubmit}>
                {/* Campo di input per l'email */}
                <div className="form-item">
                    <input type="email" name="email"
                           className="form-control" placeholder="Email" autoComplete="none"
                           value={this.state.email} onChange={this.handleInputChange} required />
                </div>

                {/* Campo di input per la password */}
                <div className="form-item">
                    <input type="password" name="password"
                           className="form-control" placeholder="Password"
                           value={this.state.password} onChange={this.handleInputChange} required />
                </div>

                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary-custom">Login</button>
                </div>
            </form>
        );
    }
}

export default Login;
