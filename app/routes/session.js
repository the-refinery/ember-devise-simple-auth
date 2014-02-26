import {tryAction} from "ember-devise-simple-auth/utils";

var SessionRoute = Ember.Route.extend({
  skipsAuthentication: true,
  model: function() {
    return this.get("authenticator");
  },
  actions: {
    signIn: function() {
      var route = this;
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
})


export default SessionRoute;
