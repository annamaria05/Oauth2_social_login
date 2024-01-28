package com.example.springsocial.exception;

import org.springframework.security.core.AuthenticationException;

// Estende AuthenticationException, una classe fornita da Spring Security
public class OAuth2AuthenticationProcessingException extends AuthenticationException {

    // Costruttore che accetta un messaggio di errore e una causa (Throwable)
    public OAuth2AuthenticationProcessingException(String msg, Throwable t) {
        // Chiama il costruttore della classe padre (AuthenticationException) con il messaggio e la causa forniti
        super(msg, t);
    }

    // Costruttore che accetta un messaggio di errore
    public OAuth2AuthenticationProcessingException(String msg) {
        // Chiama il costruttore della classe padre (AuthenticationException) con il messaggio fornito
        super(msg);
    }
}
