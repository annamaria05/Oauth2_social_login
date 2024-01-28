package com.example.springsocial.security.oauth2.user;

import com.example.springsocial.exception.OAuth2AuthenticationProcessingException;
import com.example.springsocial.model.AuthProvider;

import java.util.Map;

// Factory che crea oggetti OAuth2UserInfo in base al provider di registrazione
public class OAuth2UserInfoFactory {

    // Metodo statico per ottenere un oggetto OAuth2UserInfo in base al provider di registrazione
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        // Verifica il provider di registrazione e restituisce un'istanza appropriata di OAuth2UserInfo
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            // Se il provider non è supportato, solleva un'eccezione
            throw new OAuth2AuthenticationProcessingException("Mi dispiace! Login con " + registrationId + " non è ancora supportato.");
        }
    }
}
