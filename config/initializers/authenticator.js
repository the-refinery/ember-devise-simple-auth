import Authenticator from "app/models/authenticator";
import {getSetting} from "ember-devise-simple-auth/configuration";

var initializer = {
  name: 'authenticator',
  initialize: function(container, app) {
    var signInPath = getSetting(app, "deviseSignInPath"),
        signOutPath = getSetting(app, "deviseSignOutPath"),
        currentSessionPath = getSetting(app, "currentSessionPath");

    var auth = Authenticator.create();

    auth.set("signInPath", signInPath)
        .set("signOutPath", signOutPath)
        .set("currentSessionPath", currentSessionPath);

    container.register("devise-simple-auth:authenticator", auth, {instantiate: false});
    app.inject("route", "authenticator", "devise-simple-auth:authenticator");
    app.inject("controller", "auth", "devise-simple-auth:authenticator");
  }
};

export default initializer;

