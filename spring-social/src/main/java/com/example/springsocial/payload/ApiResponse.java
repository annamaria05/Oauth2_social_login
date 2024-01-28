package com.example.springsocial.payload;

// Classe utilizzata per rappresentare una risposta standard da restituire alle richieste dell'utente
public class ApiResponse {

    // Flag che indica se l'operazione è stata eseguita con successo
    private boolean success;

    // Messaggio associato all'operazione, che può essere un messaggio di successo o di errore
    private String message;

    // Costruttore che accetta un flag di successo e un messaggio
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Metodo getter per ottenere il valore del flag di successo
    public boolean isSuccess() {
        return success;
    }

    // Metodo setter per impostare il valore del flag di successo
    public void setSuccess(boolean success) {
        this.success = success;
    }

    // Metodo getter per ottenere il messaggio associato all'operazione
    public String getMessage() {
        return message;
    }

    // Metodo setter per impostare il messaggio associato all'operazione
    public void setMessage(String message) {
        this.message = message;
    }
}
