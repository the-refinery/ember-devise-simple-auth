var filterES6Modules = require('broccoli-es6-module-filter'),
    concat = require('broccoli-concat'),
    pkg = require('./package');


module.exports = function(broccoli) {

  var global = 'Ember',
      namespace = 'DeviseSimpleAuth';

  var appTree = broccoli.makeTree('app'),
      configTree = broccoli.makeTree('config');

  appTree = filterES6Modules(appTree, {
    moduleType: 'amd',
    main: 'index',
    packageName: 'app',
    anonymous: false
  });

  configTree = filterES6Modules(configTree, {
    moduleType: 'amd',
    main: 'plugin',
    packageName: pkg.name,
    anonymous: false
  });

  var amdTree = new broccoli.MergedTree([appTree, configTree]);

  var globalTree = concat(amdTree, {
    inputFiles: ['../../support/loader.js', '**/*.js', '../../support/exports.js'],
    outputFile: '/globals/index.js'
  });

  amdTree = concat(amdTree, {
    inputFiles: ['**/*.js'],
    outputFile: '/appkit/index.js'
  });

  return [globalTree, amdTree];
};
