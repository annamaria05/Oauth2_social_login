package com.example.springsocial.security.oauth2.user;

import java.util.Map;

// Classe che rappresenta le informazioni dell'utente ottenute da OAuth2 durante l'autenticazione tramite GitHub
public class GithubOAuth2UserInfo extends OAuth2UserInfo {

    // Costruttore che accetta un mappa di attributi dell'utente ottenuti da OAuth2
    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    // Metodo per ottenere l'ID dell'utente
    @Override
    public String getId() {
        // L'ID viene restituito come un Integer, quindi viene convertito in una stringa
        return ((Integer) attributes.get("id")).toString();
    }

    // Metodo per ottenere il nome dell'utente
    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    // Metodo per ottenere l'indirizzo email dell'utente
    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    // Metodo per ottenere l'URL dell'immagine dell'utente
    @Override
    public String getImageUrl() {
        // L'URL dell'immagine è ottenuto dall'attributo "avatar_url"
        return (String) attributes.get("avatar_url");
    }
}
