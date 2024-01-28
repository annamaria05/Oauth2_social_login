package com.example.springsocial.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

// Configurazione delle proprietà dell'applicazione con prefisso "app"
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    // Oggetti per gestire le configurazioni di autenticazione e OAuth2
    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();

    // Classe interna per gestire le configurazioni di autenticazione
    public static class Auth {
        private String tokenSecret;  // Token secret
        private long tokenExpirationMsec;  // Scadenza del token in millisecondi

        // Metodi getter e setter per tokenSecret
        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        // Metodi getter e setter per tokenExpirationMsec
        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }
    }

    // Classe interna per gestire le configurazioni di OAuth2
    public static final class OAuth2 {
        private List<String> authorizedRedirectUris = new ArrayList<>();

        // Metodi getter e setter per authorizedRedirectUris
        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }

    // Metodo getter per Auth
    public Auth getAuth() {
        return auth;
    }

    // Metodo getter per OAuth2
    public OAuth2 getOauth2() {
        return oauth2;
    }
}
