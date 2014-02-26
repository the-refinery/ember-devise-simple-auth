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
  teardownSession: function() {
    this.set("isSignedIn", false)
        .set("currentSession", null);
  },
  loadSession: function(storeOrFinder) {
    var result,
        setup = this.setupSession.bind(this);

    return this.ajax("get", this.get("currentSessionPath"))
               .then(setup);
  },
  signIn: function() {
    var setup = this.setupSession.bind(this),
        data = {
          user: {
            email: this.get("email"),
            password: this.get("password")
          }
        }

    return this.ajax("post", this.get("signInPath"), data)
               .then(setup);
  },
  signOut: function() {
    var teardown = this.teardownSession.bind(this);

    return this.ajax("delete", this.get("signOutPath"))
               .then(teardown);
  },
  ajax: function(method, url, data) {
    return new Ember.RSVP.Promise(function(resolve) {
      return resolve($.ajax({
        url: url,
        type: method,
        dataType: "json",
        data: data
      }));
    });
  }
});

export default Authenticator;
