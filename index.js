var fs = require('fs');
var path = require('path');

function EmberDeviseSimpleAuth(project) {
  this.project = project;
  this.name = 'Ember Devise Simple Auth';
}

EmberDeviseSimpleAuth.prototype.treeFor = function() {
  console.log('ARGS', arguments);
  var treePath = path.join('vendor/bourbon/dist');

  return treePath;
};

EmberDeviseSimpleAuth.prototype.included = function included(app) {
  app.import('vendor/ember-devise-simple-auth/appkit/index.js');
};

module.exports = EmberCLIBourbon;

