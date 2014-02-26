import app from "app";
import SessionRouteInitializer from "ember-devise-simple-auth/initializers/session-route";
import AuthenticatorInitializer from "ember-devise-simple-auth/initializers/authenticator";

app.initializer(SessionRouteInitializer);
app.initializer(AuthenticatorInitializer);
