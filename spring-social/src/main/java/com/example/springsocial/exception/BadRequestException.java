package com.example.springsocial.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Annota la classe per indicare a Spring di gestire questa eccezione con uno stato di risposta BAD_REQUEST
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {
    // Costruttore che accetta un messaggio di errore
    public BadRequestException(String message) {
        // Chiama il costruttore della classe padre (RuntimeException) con il messaggio fornito
        super(message);
    }

    // Costruttore che accetta un messaggio di errore e una causa (Throwable)
    public BadRequestException(String message, Throwable cause) {
        // Chiama il costruttore della classe padre (RuntimeException) con il messaggio e la causa forniti
        super(message, cause);
    }
}
