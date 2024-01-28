package com.example.springsocial.security.oauth2.user;

import java.util.Map;

// Classe astratta che rappresenta le informazioni dell'utente ottenute da OAuth2 durante l'autenticazione
public abstract class OAuth2UserInfo {

    // Mappa di attributi dell'utente ottenuti da OAuth2
    protected Map<String, Object> attributes;

    // Costruttore che accetta un mappa di attributi dell'utente ottenuti da OAuth2
    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    // Metodo getter per ottenere la mappa di attributi dell'utente
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // Metodo astratto per ottenere l'ID dell'utente
    public abstract String getId();

    // Metodo astratto per ottenere il nome dell'utente
    public abstract String getName();

    // Metodo astratto per ottenere l'indirizzo email dell'utente
    public abstract String getEmail();

    // Metodo astratto per ottenere l'URL dell'immagine dell'utente
    public abstract String getImageUrl();
}
