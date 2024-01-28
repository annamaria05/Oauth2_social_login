import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

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
