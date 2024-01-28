import com.example.springsocial.config.AppProperties;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenProvider {

    // Logger per la registrazione di messaggi
    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    // Proprietà dell'applicazione per la configurazione del token
    private AppProperties appProperties;

    // Costruttore che riceve le proprietà dell'applicazione
    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    // Metodo per la creazione di un token JWT
    public String createToken(Authentication authentication) {
        // Estrai le informazioni sull'utente autenticato
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // Ottieni la data corrente e la data di scadenza del token
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        // Costruisci il token JWT utilizzando la libreria JJWT
        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    // Metodo per estrarre l'ID utente da un token JWT
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    // Metodo per convalidare la firma e l'integrità di un token JWT
    public boolean validateToken(String authToken) {
        try {
            // Utilizza la libreria JJWT per verificare la firma e l'integrità del token
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Firma JWT non valida");
        } catch (MalformedJwtException ex) {
            logger.error("Token JWT non valido");
        } catch (ExpiredJwtException ex) {
            logger.error("Token JWT scaduto");
        } catch (UnsupportedJwtException ex) {
            logger.error("Token JWT non supportato");
        } catch (IllegalArgumentException ex) {
            logger.error("La stringa delle richieste JWT è vuota.");
        }
        return false;
    }

}
