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
  // Options: force: true|false // Requires user to have a session
  loadSession: function(storeOrFinder, options) {
    if(!options.force && this.get("isSignedIn") && this.get("currentSession")) {
      return Ember.RSVP.resolve(this.get("currentSession"));
    } else {
      return this._loadSession(options);
    }
  },
  _loadSession: function () {
    var result,
        setup = this.setupSession.bind(this),
        teardown = this.teardownSession.bind(this);

    return this.ajax("get", this.get("currentSessionPath"))
           .then(setup)
           .catch(function(error) {
             teardown();
             throw error;
           });

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
               .finally(teardown);
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
