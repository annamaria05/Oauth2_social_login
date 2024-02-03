package com.example.springsocial.security;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

// L'annotazione può essere utilizzata su parametri di metodo e tipi
@Target({ElementType.PARAMETER, ElementType.TYPE})
// L'annotazione sarà presente nei bytecode generati e può essere letta tramite reflection
@Retention(RetentionPolicy.RUNTIME)
// Documenta l'uso dell'annotazione
@Documented
// Indica che l'annotazione è un'annotazione di sicurezza principale, che può essere usata per ottenere l'utente autenticato
@AuthenticationPrincipal
public @interface CurrentUser {

}
