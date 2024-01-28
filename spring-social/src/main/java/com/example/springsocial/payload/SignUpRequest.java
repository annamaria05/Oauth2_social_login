package com.example.springsocial.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

// Classe utilizzata per rappresentare la richiesta di registrazione di un nuovo utente
public class SignUpRequest {

    // Nome dell'utente con validazione @NotBlank per assicurare che non sia vuoto
    @NotBlank
    private String name;

    // Indirizzo email dell'utente con validazione tramite @Email e @NotBlank per assicurare che non sia vuoto
    @NotBlank
    @Email
    private String email;

    // Password dell'utente con validazione @NotBlank per assicurare che non sia vuota
    @NotBlank
    private String password;

    // Metodo getter per ottenere il nome
    public String getName() {
        return name;
    }

    // Metodo setter per impostare il nome
    public void setName(String name) {
        this.name = name;
    }

    // Metodo getter per ottenere l'indirizzo email
    public String getEmail() {
        return email;
    }

    // Metodo setter per impostare l'indirizzo email
    public void setEmail(String email) {
        this.email = email;
    }

    // Metodo getter per ottenere la password
    public String getPassword() {
        return password;
    }

    // Metodo setter per impostare la password
    public void setPassword(String password) {
        this.password = password;
    }
}
