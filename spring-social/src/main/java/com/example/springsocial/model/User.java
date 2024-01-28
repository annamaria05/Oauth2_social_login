package com.example.springsocial.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

// Enità JPA, cioè classe che rappresenta tabella nel db
@Entity
@Table(name = "users")
public class User {

    // Identificatore univoco dell'utente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome dell'utente
    @Column(nullable = false)
    private String name;

    // Indirizzo email dell'utente con validazione tramite @Email
    @Email
    @Column(nullable = false)
    private String email;

    // Campo per memorizzare le note dell'utente
    @Column(nullable = true)
    private String note;

    // URL dell'immagine dell'utente
    private String imageUrl;

    // Password dell'utente (annotato con @JsonIgnore per non essere incluso nella rappresentazione JSON)
    @JsonIgnore
    private String password;

    // Tipo di provider di autenticazione (locale, Google, Facebook, etc.)
    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    // ID del provider (ad esempio, l'ID di Google o Facebook)
    private String providerId;

    // Metodi getter e setter per gli attributi della classe

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }
}
