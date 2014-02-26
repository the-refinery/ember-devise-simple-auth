import app from "app";
import SessionRouteInitializer from "ember-devise-simple-auth/initializers/session-route";
import AuthenticatorInitializer from "ember-devise-simple-auth/initializers/authenticator";

Ember.Controller.reopen({
  isSignedIn: Ember.computed.alias("auth.isSignedIn"),
  currentSession: Ember.computed.alias("auth.currentSession")
});

app.initializer(SessionRouteInitializer);
app.initializer(AuthenticatorInitializer);
