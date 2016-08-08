'use strict';

describe('Unit: MainCtrl', function() {

  let createController;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller, $rootScope) => {
      let scope = $rootScope.$new();
      // let SettingsFactory = _SettingsFactory_;

      createController = () => {
        return $controller('MainCtrl', {
          '$scope': scope
        });
      };
      // ctrl = $controller('MainCtrl');
    });
  });

  it('should exist', function() {
  	let ctrl = createController();
    expect(ctrl).toBeDefined();
  });

  // it('should have a number variable equal to 1234', function() {
  //   expect(ctrl.number).toEqual(1234);
  // });

  // it('should have a title variable equal to \'AngularJS, Gulp, and Browserify!\'', function() {
  //   expect(ctrl.title).toEqual('AngularJS, Gulp, and Browserify! Written with keyboards and love!');
  // });

});