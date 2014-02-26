var filterES6Modules = require('broccoli-es6-module-filter'),
    concat = require('broccoli-concat'),
    pkg = require('./package');


module.exports = function(broccoli) {

  var global = 'Ember',
      namespace = 'DeviseSimpleAuth';

  var appTree = broccoli.makeTree('app'),
      configTree = broccoli.makeTree('config');

  var amdTree = filterES6Modules(appTree, {
    moduleType: 'amd',
    main: 'index',
    packageName: 'app',
    anonymous: false
  });

  var pluginTree = filterES6Modules(configTree, {
    moduleType: 'amd',
    main: 'plugin',
    packageName: pkg.name,
    anonymous: false
  });

  return concat(new broccoli.MergedTree([amdTree, pluginTree]), {
    inputFiles: ['**/*.js'],
    outputFile: '/index.js'
  });
};