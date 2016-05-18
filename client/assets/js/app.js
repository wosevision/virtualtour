(function() {
  'use strict';

  angular.module('application', [
    // dependencies
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'angular-loading-bar',
    'uiGmapgoogle-maps',
    'angular-intro',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    //app
    'services',
    'controllers'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider', 'cfpLoadingBarProvider'];

  function config($urlProvider, $locationProvider, uiGmapGoogleMapApiProvider, cfpLoadingBarProvider) {

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA4FYWF5t10-jOHCiAzlRmoetVJ8D1_oc8',
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization,places'
    });

    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      requireBase: '/virtualtour/test/' //false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
