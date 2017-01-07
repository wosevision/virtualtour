'use strict';

const istanbul = require('browserify-istanbul');
const isparta  = require('isparta');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: true,

  frameworks: ['jasmine', 'browserify'],

  preprocessors: {
    'app/components/**/*.js': ['browserify', 'coverage'],
    'app/components/**/*_spec.js': ['browserify']
  },

  browsers: ['Chrome'],

  reporters: ['progress', 'coverage'],

  autoWatch: true,

  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', '**/test/**', '**/components/**/*_spec.js']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // app-specific code
    '../virtualtour-ks/public/js/main.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',
    'https://maps.googleapis.com/maps/api/js?sensor=false',
    'node_modules/ngmap/build/scripts/ng-map.min.js',

    // test files
    'app/components/**/*_spec.js'
  ]

};

const customLaunchers = {
  chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  }
};

const ciAdditions = {
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage', 'saucelabs']
};

module.exports = function(config) {
  const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);
  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
