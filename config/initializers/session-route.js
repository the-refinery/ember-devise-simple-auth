import {getSetting} from "ember-devise-simple-auth/configuration";

var initializer = {
  name: 'session-route',
  initialize: function(container, app) {
    app.Router.map(function() {
      this.route("session", {path: getSetting(app, "signInPath")});
    });
  }
};

export default initializer;
