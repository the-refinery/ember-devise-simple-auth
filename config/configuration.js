var defaults = {
  signInPath: "/sign-in",
  deviseSignInPath: "/users/sign_in",
  deviseSignOutPath: "/users/sign_out",
  currentSessionPath: "/sessions/current"
};

var getSetting = function(app, setting) {
  var prefixedKey = "deviseSimpleAuth." + setting;
  return app.getWithDefault(prefixedKey, defaults[setting]);
};

export { getSetting };
