package com.example.springsocial.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Annota la classe per indicare a Spring di gestire questa eccezione con uno stato di risposta NOT_FOUND
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // Attributi della classe
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    // Costruttore che accetta il nome della risorsa, il nome del campo e il valore del campo
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        // Chiama il costruttore della classe padre (RuntimeException) con un messaggio formato
        super(String.format("%s non trovato con %s: '%s'", resourceName, fieldName, fieldValue));

        // Inizializza gli attributi della classe con i valori forniti
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    // Metodo per ottenere il nome della risorsa
    public String getResourceName() {
        return resourceName;
    }

    // Metodo per ottenere il nome del campo
    public String getFieldName() {
        return fieldName;
    }

    // Metodo per ottenere il valore del campo
    public Object getFieldValue() {
        return fieldValue;
    }
}
