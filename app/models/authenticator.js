var Authenticator = Ember.Object.extend({
  email: null,
  password: null,
  currentSession: null,
  isSignedIn: false,
  signIn: function() {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {
      resolve($.ajax({
        url: _this.get("signInPath"),
        type: "post",
        dataType: "json",
        data: {
          user: {
            email: _this.get("email"),
            password: _this.get("password")
          }
        }
      }).then(function(session) {
        _this.set("isSignedIn", true)
             .set("currentSession", session);
        return session;
      }));
    });
  }
});

export default Authenticator;
