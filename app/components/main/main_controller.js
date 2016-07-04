function MainCtrl($rootScope, $scope, $state, $timeout, $mdComponentRegistry, $mdSidenav, $log, Scene, GlobalSettings) {
  'ngInject';
  // ViewModel

  // MainCtrl reference
  const mc = this;
  const s = $scope;

  // screen and (max-device-width: 767px) and (orientation: landscape)
  // check for mobile/landscape on every digest
  $scope.$watch(
    function() {
      var m;
      if (window.matchMedia('screen and (max-device-width: 767px)').matches) {
        m = true;
        if (window.matchMedia('screen and (orientation: landscape)').matches) {
          m = 'landscape';
        }
        return m;
      }
      //return window.matchMedia('screen and (max-device-width: 767px) and (orientation: landscape)').matches;
    },
    function(m) {
      $rootScope.mobile = m;
      //console.log(m);
    }
  );

  // Scene.get({ id: 'ua_int_2a' }, function(data) {
  //   mc.scenes.ua_int[2].a = data.scene;
  //   //console.log(data);
  // });
  // Scene.get({ id: 'ua_int_1b-link' }, function(data) {
  //   //console.log(data);
  //   mc.scene = data.scene;
  // });

  s.gotoScene = function(code, id) {
    //console.log($state);
    $state.go('scene', { code: code, id: id });
  }

  s.menuViews = GlobalSettings.APP._MENU_VIEWS;

  //s.toggleMenu = buildToggler('right');
  //s.toggleConfig = buildToggler('config');

  s.isMenuOpen = function(navID){
    $mdSidenav(navID).isOpen();
    //console.log($mdSidenav(navID));
  };

  s.toggleMenu = function(navID, view) {
      if (view && !s.menuViews[view].show) {
      angular.forEach(s.menuViews, function(v) { v.show = false; });
      s.menuViews[view].show = true;
      if (!$mdSidenav(navID).isOpen()) {
        $mdSidenav(navID).open();
      }
      var viewOpts = { 
        location: true,
        inherit: true,
        relative: $state.$current,
        notify: true
      }
      $state.go(view);
    } else {
        $mdSidenav(navID)
          .toggle();
    }
  }

  s.toolbar = {
    isOpen: $rootScope.appSettings._USER.__TOOLBAR_OPEN.val,
    toggle: function() {
      this.isOpen = !this.isOpen;
      !this.isOpen&&$mdSidenav('right').close();
    }
  }
}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
