package com.example.springsocial.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    // Definizione della durata massima per la cache delle configurazioni CORS in secondi
    private final long MAX_AGE_SECS = 3600;

    // Iniezione del valore delle origini consentite dalla proprietà 'app.cors.allowedOrigins' nel file delle proprietà
    @Value("${app.cors.allowedOrigins}")
    private String[] allowedOrigins;

    // Override del metodo per aggiungere configurazioni specifiche per il CORS
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Configurazione delle origini per tutti i percorsi
                .allowedOrigins(allowedOrigins) // Specifica delle origini consentite
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Metodi HTTP consentiti
                .allowedHeaders("*") // Tutti gli header sono consentiti
                .allowCredentials(true) // Consentire i cookie durante le richieste CORS
                .maxAge(MAX_AGE_SECS); // Durata massima della cache delle configurazioni CORS in secondi
    }
}
