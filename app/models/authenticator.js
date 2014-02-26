var Authenticator = Ember.Object.extend({
  email: null,
  password: null,
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
      }));
    });
  }
});

export default Authenticator;
