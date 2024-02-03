package com.example.springsocial.security;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    // Questo metodo viene chiamato durante l'autenticazione per ottenere le informazioni dell'utente in base all'email
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Cerca l'utente nel repository tramite l'email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Utente non trovato con email : " + email)
                );

        // Restituisce un'istanza di UserPrincipal, che implementa l'interfaccia UserDetails di Spring Security
        return UserPrincipal.create(user);
    }

    // Metodo aggiuntivo per caricare le informazioni dell'utente in base all'ID
    @Transactional
    public UserDetails loadUserById(Long id) {
        // Cerca l'utente nel repository tramite l'ID
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        // Restituisce un'istanza di UserPrincipal, che implementa l'interfaccia UserDetails di Spring Security
        return UserPrincipal.create(user);
    }
}
