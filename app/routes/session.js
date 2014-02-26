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
          route.send("validSignIn", session);
        }).catch(function(error) {
          var controller = route.controllerFor("session");
          controller.set("loginFailed", true);
          try {
            route.send("invalidSignIn", error);
          } catch(error) {
            if(error instanceof Ember.Error) {
              // intentionally left blank
            } else {
              throw error;
            }
          }
        console.log("not so good, got error: ", error);
      });
    }
  }
})


export default SessionRoute;
