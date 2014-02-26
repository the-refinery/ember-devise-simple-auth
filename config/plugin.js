import app from "app";
import SessionRouteInitializer from "ember-devise-simple-auth/initializers/session-route";
import AuthenticatorInitializer from "ember-devise-simple-auth/initializers/authenticator";

Ember.Route.reopen({
  beforeModel: function() {
    if(this.skipsAuthentication) {
      return;
    }

    return this.get("authenticator").loadSession(this.get("store"));
  }
});

Ember.Controller.reopen({
  isSignedIn: Ember.computed.alias("auth.isSignedIn"),
  currentSession: Ember.computed.alias("auth.currentSession")
});

app.initializer(SessionRouteInitializer);
app.initializer(AuthenticatorInitializer);
