import app from "app";
import {tryAction} from "ember-devise-simple-auth/utils";
import SessionRouteInitializer from "ember-devise-simple-auth/initializers/session-route";
import AuthenticatorInitializer from "ember-devise-simple-auth/initializers/authenticator";

Ember.Route.reopen({
  beforeModel: function() {
    if(this.skipsAuthentication) {
      return;
    }

    return this.get("authenticator").loadSession(this.get("store"));
  },
  _actions: {
    signOut: function() {
      this.get("authenticator").signOut();
      tryAction(this, "didSignOut");
    }
  }
});

Ember.Controller.reopen({
  isSignedIn: Ember.computed.alias("auth.isSignedIn"),
  currentSession: Ember.computed.alias("auth.currentSession")
});

app.initializer(SessionRouteInitializer);
app.initializer(AuthenticatorInitializer);
