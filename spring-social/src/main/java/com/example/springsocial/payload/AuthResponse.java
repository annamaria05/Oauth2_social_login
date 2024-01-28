package com.example.springsocial.payload;

// Classe utilizzata per rappresentare la risposta di autenticazione contenente l'access token
public class AuthResponse {

    // Token di accesso ottenuto durante l'autenticazione
    private String accessToken;

    // Tipo di token (di solito "Bearer" per token di accesso OAuth 2.0)
    private String tokenType = "Bearer";

    // Costruttore che accetta l'access token come parametro
    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    // Metodo getter per ottenere l'access token
    public String getAccessToken() {
        return accessToken;
    }

    // Metodo setter per impostare l'access token
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    // Metodo getter per ottenere il tipo di token
    public String getTokenType() {
        return tokenType;
    }

    // Metodo setter per impostare il tipo di token
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
