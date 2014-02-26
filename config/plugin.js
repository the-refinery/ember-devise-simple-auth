import app from "app";
import {tryAction} from "ember-devise-simple-auth/utils";
import SessionRouteInitializer from "ember-devise-simple-auth/initializers/session-route";
import AuthenticatorInitializer from "ember-devise-simple-auth/initializers/authenticator";

function lookupTargetRoute(transition, container) {
  var key = "route:" + transition.targetName
  return container.lookup(key);
}

Ember.Route.reopen({
  beforeModel: function(transition) {
    var targetRoute = lookupTargetRoute(transition, this.container),
        requiresAuth = !targetRoute.skipsAuthentication;

    return this.get("authenticator")
               .loadSession(this.get("store"), {force: requiresAuth});
  },
  _actions: {
    signOut: function() {
      this.get("authenticator").signOut();
      tryAction(this, "didSignOut", function() {
        this.transitionTo("session");
      });
    },
    willTransition: function(transition) {
      var targetRoute = lookupTargetRoute(transition, this.container),
          needsAuth = !(this.get("authenticator.isSignedIn")
                        || targetRoute.skipsAuthentication);

      if(needsAuth) {
        this.transitionTo("session");
      } else {
        return true;
      }
    },
    error: function(error) {
      if(reason.status == 401 || reason.status == 403) {
        tryAction(this, "unauthorizedRequest", function() {
          this.transitionTo("session");
        });
      } else {
        return true;
      }
    }
  }
});

Ember.Controller.reopen({
  isSignedIn: Ember.computed.alias("auth.isSignedIn"),
  currentSession: Ember.computed.alias("auth.currentSession")
});

app.initializer(SessionRouteInitializer);
app.initializer(AuthenticatorInitializer);
