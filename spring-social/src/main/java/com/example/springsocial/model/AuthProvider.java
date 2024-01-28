package com.example.springsocial.model;

// Enumerazione che rappresenta i diversi tipi di provider di autenticazione
public enum AuthProvider {

    // Provider di autenticazione locale (utente e password memorizzati localmente)
    local,

    // Provider di autenticazione Facebook
    facebook,

    // Provider di autenticazione Google
    google,

    // Provider di autenticazione GitHub
    github
}
