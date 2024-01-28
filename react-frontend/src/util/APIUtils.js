import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

// Funzione utilizzata per effettuare richieste API
const request = (options) => {
    // Creazione degli headers con il tipo di contenuto JSON
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    // Se c'è un token di accesso nell'archivio locale, lo aggiunge agli headers
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    // Imposta le opzioni predefinite con gli headers creati
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    // Esegue la richiesta fetch e gestisce la risposta
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                // Se la risposta non è ok, restituisce una Promise con il JSON del corpo della risposta
                if (!response.ok) {
                    return Promise.reject(json);
                }
                // Altrimenti restituisce il JSON del corpo della risposta
                return json;
            })
        );
};


// Ottiene le informazioni sull'utente corrente
export function getCurrentUser() {
    // Se non è presente un token di accesso, restituisce una Promise con il messaggio "Nessun token di accesso impostato."
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("Nessun token di accesso impostato.");
    }

    // Esegue una richiesta API per ottenere le informazioni sull'utente corrente
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

// Esegue il login con le credenziali fornite
export function login(loginRequest) {
    // Esegue una richiesta API di tipo POST per il login
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

// Registra un nuovo utente con le informazioni fornite
export function signup(signupRequest) {
    // Esegue una richiesta API di tipo POST per la registrazione
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

// Salva le note dell'utente
export function saveNotes(note) {
    // Se non è presente un token di accesso, restituisce una Promise con il messaggio "Nessun token di accesso impostato."
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("Nessun token di accesso impostato.");
    }

    // Esegue una richiesta API di tipo POST per salvare le note
    return request({
        url: API_BASE_URL + "/auth/saveNotes",
        method: 'POST',
        body: JSON.stringify(note)
    });
}


