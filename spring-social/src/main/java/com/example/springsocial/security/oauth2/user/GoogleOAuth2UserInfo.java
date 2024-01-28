package com.example.springsocial.security.oauth2.user;

import java.util.Map;

// Classe che rappresenta le informazioni dell'utente ottenute da OAuth2 durante l'autenticazione tramite Google
public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    // Costruttore che accetta un mappa di attributi dell'utente ottenuti da OAuth2
    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    // Metodo per ottenere l'ID dell'utente da attributi
    @Override
    public String getId() {
        // L'ID viene restituito dall'attributo "sub"
        return (String) attributes.get("sub");
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
        // L'URL dell'immagine è ottenuto dall'attributo "picture"
        return (String) attributes.get("picture");
    }
}
