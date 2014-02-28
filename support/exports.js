Ember.DeviseSimpleAuth = require('ember-devise-simple-auth');

var SessionRoute = require('app/routes/session').default;

Ember.Application.initializer({
  name: "register-session-route",
  initialize: function(container, app) {
    container.register("route:session", SessionRoute);
  }
});
