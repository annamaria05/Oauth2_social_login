package com.example.springsocial.security.oauth2.user;

import java.util.Map;

// Classe che rappresenta le informazioni dell'utente ottenute da OAuth2 durante l'autenticazione tramite Facebook
public class FacebookOAuth2UserInfo extends OAuth2UserInfo {

    // Costruttore che accetta un mappa di attributi dell'utente ottenuti da OAuth2
    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    // Metodo per ottenere l'ID dell'utente
    @Override
    public String getId() {
        return (String) attributes.get("id");
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
        if(attributes.containsKey("picture")) {
            Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
            if(pictureObj.containsKey("data")) {
                Map<String, Object>  dataObj = (Map<String, Object>) pictureObj.get("data");
                if(dataObj.containsKey("url")) {
                    return (String) dataObj.get("url");
                }
            }
        }
        return null;
    }
}
