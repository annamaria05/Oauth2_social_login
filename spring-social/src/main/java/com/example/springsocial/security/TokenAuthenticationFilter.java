import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    // Iniezione delle dipendenze necessarie
    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    // Logger per la registrazione di messaggi
    private static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationFilter.class);

    // Metodo principale per eseguire il filtro durante ogni richiesta
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Ottieni il token JWT dalla richiesta
            String jwt = getJwtFromRequest(request);

            // Verifica se il token è valido e contiene un ID utente
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userId = tokenProvider.getUserIdFromToken(jwt);

                // Carica i dettagli dell'utente associati all'ID utente
                UserDetails userDetails = customUserDetailsService.loadUserById(userId);

                // Crea un'istanza di UsernamePasswordAuthenticationToken con i dettagli dell'utente
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Imposta l'autenticazione nell'ambiente di sicurezza di Spring
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            // Registra un messaggio di errore se si verifica un'eccezione durante il processo di autenticazione
            logger.error("Impossibile impostare l'autenticazione dell'utente nel contesto di sicurezza", ex);
        }

        // Prosegui con la catena di filtri
        filterChain.doFilter(request, response);
    }

    // Metodo per estrarre il token JWT dalla richiesta
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
