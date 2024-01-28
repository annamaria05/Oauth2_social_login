package com.example.springsocial.repository;

import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repository che gestisce l'accesso ai dati degli utenti nel database
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Metodo per trovare un utente tramite l'indirizzo email
    Optional<User> findByEmail(String email);

    // Metodo per verificare l'esistenza di un utente tramite l'indirizzo email
    Boolean existsByEmail(String email);
}
