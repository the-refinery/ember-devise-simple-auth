var Authenticator = Ember.Object.extend({
  email: null,
  password: null,
  currentUser: null,
  isSignedIn: false,
  isValid: Ember.computed.not("isInvalid"),
  isInvalid: Ember.computed.or("emailInvalid", "passwordInvalid"),
  emailWillChange: function() {
    this.set("emailInvalid", false);
  }.observesBefore("email"),
  passwordWillChange: function() {
    this.set("passwordInvalid", false);
  }.observesBefore("password"),
  setupSession: function(session) {
    this.set("isSignedIn", true)
         .set("currentUser", session);
    return session;
  },
  teardownSession: function() {
    this.set("isSignedIn", false)
        .set("currentUser", null);
  },
  // Options: skip: true|false // Doesn't make ajax request for session
  loadSession: function(storeOrFinder, options) {
    if(this.get("isSignedIn") && this.get("currentUser")) {
      return Ember.RSVP.resolve(this.get("currentUser"));
    } else if(options.skip) {
      return Ember.RSVP.resolve(null);
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
        };

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
