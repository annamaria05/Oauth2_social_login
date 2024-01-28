// In produzione, registriamo un service worker per servire risorse dalla cache locale.
// Questo consente all'app di caricarsi più velocemente nelle visite successive in produzione e fornisce
// funzionalità offline. Tuttavia, ciò significa anche che gli sviluppatori (e gli utenti)
// vedranno gli aggiornamenti solo dalla "N+1" visita a una pagina, poiché le risorse precedentemente
// memorizzate nella cache vengono aggiornate in background.

// Per saperne di più sui vantaggi di questo modello, leggi https://goo.gl/KwvDNy.
// Questo link include anche istruzioni su come disabilitare questo comportamento.


const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // Il costruttore URL è disponibile in tutti i browser che supportano SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if (publicUrl.origin !== window.location.origin) {
            /* Il service worker non funzionerà se PUBLIC_URL è su un'origine diversa
               rispetto a quella sulla quale la pagina è servita. Ciò potrebbe accadere
               se viene utilizzato un CDN per servire le risorse;
               vedi https://github.com/facebookincubator/create-react-app/issues/2374 */
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // Questo viene eseguito in localhost. Verifichiamo se un service worker esiste ancora o meno.
                checkValidServiceWorker(swUrl);

                /* Aggiunta di alcuni log aggiuntivi a localhost, indirizzando gli sviluppatori alla
                / documentazione del service worker/PWA.*/
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'Questa app web sta venendo servita in modo cache-first da un service ' +
                        'worker. Per saperne di più, visita https://goo.gl/SC7cgQ'
                    );
                });
            } else {
                // Non è localhost. Registra semplicemente il service worker.
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            /* A questo punto, il vecchio contenuto sarà stato eliminato e
                               il nuovo contenuto sarà stato aggiunto alla cache.
                               È il momento perfetto per visualizzare un messaggio "Nuovo contenuto disponibile;
                               si prega di aggiornare." nella tua web app. */
                            console.log('Nuovo contenuto disponibile; si prega di aggiornare.');
                        } else {
                            /* A questo punto, tutto è stato precaricato.
                               È il momento perfetto per visualizzare un
                               messaggio "Il contenuto è memorizzato nella cache per l'uso offline." */
                            console.log('Il contenuto è memorizzato nella cache per l\'uso offline.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Errore durante la registrazione del service worker:', error);
        });
}

function checkValidServiceWorker(swUrl) {
    // Verifica se il service worker può essere trovato. In caso contrario, ricarica la pagina.
    fetch(swUrl)
        .then(response => {
            // Assicura che il service worker esista e che stiamo effettivamente ottenendo un file JS.
            if (
                response.status === 404 ||
                response.headers.get('content-type').indexOf('javascript') === -1
            ) {
                // Nessun service worker trovato. Probabilmente un'app diversa. Ricarica la pagina.
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker trovato. Prosegui come al solito.
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log(
                'Nessuna connessione internet trovata. L\'app è in esecuzione in modalità offline.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
