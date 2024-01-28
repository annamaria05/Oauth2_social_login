import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // Logger per la registrazione di messaggi
    private static final Logger logger = LoggerFactory.getLogger(RestAuthenticationEntryPoint.class);

    // Metodo implementato da AuthenticationEntryPoint per gestire l'entrata di richieste non autenticate
    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {
        // Registra un messaggio di errore con il logger
        logger.error("Risposta con errore non autorizzato. Messaggio - {}", e.getMessage());

        // Invia una risposta di errore 401 (Unauthorized) con il messaggio dell'eccezione
        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                e.getLocalizedMessage());
    }
}
