var defaults = {
  signInPath: "/sign-in",
  deviseSignInPath: "/users/sign_in"
};

var getSetting = function(app, setting) {
  var prefixedKey = "deviseSimpleAuth." + setting;
  return app.getWithDefault(prefixedKey, defaults[setting]);
};

export { getSetting };
