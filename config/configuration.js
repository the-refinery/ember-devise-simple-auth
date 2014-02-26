var defaults = {
  signInPath: "/sign-in"
};

var getSetting = function(app, setting) {
  return app.getWithDefault(setting, defaults[setting.replace("deviseSimpleAuth.", "")]);
};

export { getSetting };
