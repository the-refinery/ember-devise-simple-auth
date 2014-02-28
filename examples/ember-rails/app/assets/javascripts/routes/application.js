DeviseSimpleAuthExample.ApplicationRoute = Ember.Route.extend({
  actions: {
    validSignIn: function() {
      this.transitionTo('dashboard');
    }
  }
});
