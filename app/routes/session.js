import {tryAction} from "ember-devise-simple-auth/utils";

var SessionRoute = Ember.Route.extend({
  skipsAuthentication: true,
  model: function() {
    return this.get("authenticator");
  },
  validateCredentials: function() {
    return this.get("authenticator.isValid");
  },
  actions: {
    validateCredentials: function() {
      if(Ember.isEmpty(this.get("authenticator.email"))) {
        this.set("authenticator.emailInvalid", true);
      }

      if(Ember.isEmpty(this.get("authenticator.password"))) {
        this.set("authenticator.passwordInvalid", true);
      }

      return true;
    },
    signIn: function() {
      var route = this;

      this.send("validateCredentials");

      if(this.get("authenticator.isInvalid")) {
        return;
      }

      this.get("authenticator").signIn().
        then(function(session) {
          tryAction(route, "validSignIn", session);
        }).catch(function(error) {
          var controller = route.controllerFor("session");
          controller.set("loginFailed", true);
          tryAction(route, "invalidSignIn", error);
        });
    }
  }
});


export default SessionRoute;
