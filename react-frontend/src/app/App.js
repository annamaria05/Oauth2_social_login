import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Home from '../home/Home';
import About from '../about/About';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import AlertPopup from "../common/AlertPopup";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
            showLogoutPopup: false,
            showSignupPopup: false,
            showLoginErrorPopup: false // Aggiunto stato per controllare la visualizzazione del popup di errore di login
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handlePopupOkClick = this.handlePopupOkClick.bind(this);
        this.handleSignupPopup = this.handleSignupPopup.bind(this);
        this.handleSignupPopupOkClick = this.handleSignupPopupOkClick.bind(this);
        this.handleLoginErrorPopupOkClick = this.handleLoginErrorPopupOkClick.bind(this);
    }

    // Funzione per caricare l'utente attualmente loggato
    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    // Funzione per gestire il logout
    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null,
            showLogoutPopup: true,
            showSignupPopup: false,
            showLoginErrorPopup: false
        });
    }

    // Funzione per gestire il clic del pulsante "OK" nel popup
    handlePopupOkClick() {
        this.setState({ showLogoutPopup: false });
        window.location.reload();

    }

    // Funzione per gestire la visualizzazione del popup di registrazione
    handleSignupPopup() {
        this.setState({ showSignupPopup: true });
    }

    // Funzione per gestire il clic del pulsante "OK" nel popup di registrazione
    handleSignupPopupOkClick() {
        this.setState({ showSignupPopup: false });
    }

    handleLoginError = () => {
        this.setState({ showLoginErrorPopup: true });
    }

    // Funzione per gestire il clic del pulsante "OK" nel popup di errore di login
    handleLoginErrorPopupOkClick() {
        this.setState({ showLoginErrorPopup: false });
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        const { authenticated, loading, showLogoutPopup, showSignupPopup, showLoginErrorPopup } = this.state;

        if (loading) {
            return <LoadingIndicator />;
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    {/* Componente NavBar */}
                    <NavBar authenticated={authenticated} onLogout={this.handleLogout} />
                </div>
                <div className="app-body">
                    {/* Switch per la gestione delle route */}
                    <Switch>
                        {/* Route privata per il profilo utente */}
                        <PrivateRoute
                            path="/profile"
                            authenticated={authenticated}
                            currentUser={this.state.currentUser}
                            component={Profile}
                        />
                        <Route exact path="/" component={Home} />
                        <Route path="/login" render={(props) => <Login authenticated={authenticated} onLoginError={this.handleLoginError.bind(this)} {...props} />} />
                        <Route path="/about" render={(props) => <About authenticated={authenticated} {...props} />} />
                        <Route
                            path="/signup"
                            render={(props) => (
                                <Signup
                                    authenticated={authenticated}
                                    showSignupPopup={this.handleSignupPopup}
                                    {...props}
                                />
                            )}
                        />
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <AlertPopup
                    show={showLogoutPopup}
                    message="Logout eseguito con successo!"
                    onOkClick={this.handlePopupOkClick}
                />
                <AlertPopup
                    show={showSignupPopup}
                    message={
                        <div>
                            Registrazione effettuata con successo!<br />
                            Effettua il login per continuare.
                        </div>
                    }
                    onOkClick={this.handleSignupPopupOkClick}
                />
                <AlertPopup
                    show={showLoginErrorPopup}
                    message="Credenziali errate. Riprova!"
                    onOkClick={this.handleLoginErrorPopupOkClick}
                />
            </div>
        );
    }
}

export default App;
