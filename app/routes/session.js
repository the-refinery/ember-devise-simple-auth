var SessionRoute = Ember.Route.extend({
  skipsAuthentication: true,
  model: function() {
    return this.store.createRecord("session");
  },
  actions: {
    signIn: function() {
      var route = this;
      new Ember.RSVP.Promise(function(resolve) {
        resolve($.ajax({
          url: "/users/sign_in",
          type: "post",
          dataType: "json",
          data: {
            user: {
              email: route.currentModel.get("email"),
              password: route.currentModel.get("password")
            }
          }
        }));
      }).then(function(session) {
        route.controllerFor("application").
          set("isSignedIn", true).
          set("currentSession", session);
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
