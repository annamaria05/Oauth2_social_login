package com.example.springsocial.config;

import static org.springframework.security.config.Customizer.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.springsocial.security.CustomUserDetailsService;
import com.example.springsocial.security.RestAuthenticationEntryPoint;
import com.example.springsocial.security.TokenAuthenticationFilter;
import com.example.springsocial.security.oauth2.CustomOAuth2UserService;
import com.example.springsocial.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.example.springsocial.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.example.springsocial.security.oauth2.OAuth2AuthenticationSuccessHandler;


// Configurazione generale della sicurezza dell'applicazione Spring
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Iniezione delle dipendenze necessarie per la configurazione della sicurezza
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Autowired
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    // Definizione di un bean per il filtro di autenticazione basato su token
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    /*
        Per impostazione predefinita, Spring OAuth2 utilizza HttpSessionOAuth2AuthorizationRequestRepository per salvare le
        la richiesta di autorizzazione. Ma, dal momento che il nostro servizio è stateless, non è possibile salvarlo nella
        sessione. Verrà invece salvata in un cookie codificato Base64.
      */
    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    // Configurazione dell'AuthenticationManagerBuilder per utilizzare il servizio di dettagli utente personalizzato e il codificatore di password
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    // Definizione di un bean per il codificatore di password (BCryptPasswordEncoder in questo caso)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Definizione di un bean per l'AuthenticationManager
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // Configurazione delle regole di sicurezza HTTP
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults()) // Configurazione della gestione delle richieste CORS
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Configurazione della gestione della sessione (in questo caso, senza sessione)
                .csrf(csrf -> csrf
                        .disable()) // Disabilita la protezione CSRF
                .formLogin(login -> login
                        .disable()) // Disabilita l'autenticazione basata su form
                .httpBasic(basic -> basic
                        .disable()) // Disabilita l'autenticazione HTTP Basic
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint(new RestAuthenticationEntryPoint())) // Configurazione del gestore delle eccezioni per il punto di ingresso dell'autenticazione
                .authorizeRequests(requests -> requests
                        .antMatchers("/", "/error", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html", "/**/*.css", "/**/*.js")
                        .permitAll() // Consentire a tutti l'accesso alle risorse pubbliche
                        .antMatchers("/auth/**", "/oauth2/**")
                        .permitAll() // Consentire a tutti l'accesso alle operazioni di autenticazione e OAuth2
                        .anyRequest()
                        .authenticated()) // Tutte le altre richieste richiedono l'autenticazione
                .oauth2Login(login -> login
                        .authorizationEndpoint()
                        .baseUri("/oauth2/authorize") // Configurazione del punto di accesso dell'endpoint di autorizzazione OAuth2
                        .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                        .and()
                        .redirectionEndpoint()
                        .baseUri("/oauth2/callback/*") // Configurazione dell'endpoint di reindirizzamento OAuth2
                        .and()
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService)
                        .and()
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler)); // Configurazione del flusso di login OAuth2

        // Aggiunta del filtro personalizzato per l'autenticazione basata su token
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
