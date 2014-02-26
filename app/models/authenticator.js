var Authenticator = Ember.Object.extend({
  email: null,
  password: null,
  currentSession: null,
  isSignedIn: false,
  setupSession: function(session) {
    this.set("isSignedIn", true)
         .set("currentSession", session);
    return session;
  },
  loadSession: function(storeOrFinder) {
    var result,
        currentSessionPath = this.get("currentSessionPath"),
        setupSession = this.setupSession.bind(this);

    return new Ember.RSVP.Promise(function(resolve) {
      return resolve($.ajax({
        url: currentSessionPath,
        type: "get",
        dataType: "json"
      }).then(setupSession));
    });
  },
  signIn: function() {
    var setupSession = this.setupSession.bind(this);

    return new Ember.RSVP.Promise(function(resolve) {
      return resolve($.ajax({
        url: _this.get("signInPath"),
        type: "post",
        dataType: "json",
        data: {
          user: {
            email: _this.get("email"),
            password: _this.get("password")
          }
        }
      }).then(setupSession));
    });
  }
});

export default Authenticator;
