import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated ? (
                // Se l'utente è autenticato, renderizza il componente specificato
                <Component {...rest} {...props} />
            ) : (
                // Se l'utente non è autenticato, reindirizza alla pagina di login
                <div>
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }, /* location contiene informazioni sulla posizione corrente
                                                             della navigazione, come l'URL. */
                        }}
                    />
                </div>
            )
        }
    />
);

export default PrivateRoute;
