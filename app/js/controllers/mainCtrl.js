function MainCtrl($rootScope, $scope, $timeout, $mdSidenav, $log, Scene, GlobalSettings) {
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

  mc.scenes = {
    ua_int: [
      {},
      { b_link: '' },
      { a: '' }
    ]
  };

  Scene.get({ id: 'ua_int_2a' }, function(data) {
    mc.scenes.ua_int[2].a = data.scene;
    //console.log(data);
  });
  Scene.get({ id: 'ua_int_1b-link' }, function(data) {
    mc.scenes.ua_int[1].b_link = data.scene;
    //console.log(data);
    mc.scene = mc.scenes.ua_int[1].b_link;
  });

  s.gotoScene = function() {
    var lastScene = mc.scene;
    mc.scene = {};
    mc.scene = lastScene==mc.scenes.ua_int[2].a ? mc.scenes.ua_int[1].b_link : mc.scenes.ua_int[2].a;
  }

  s.menuViews = {
    location: {
      label: 'By location',
      icon: '',
      desc: 'View a list of available tour locations',
      show: false
    },
    map: {
      label: 'By map',
      icon: '',
      desc: 'Explore locations from the UOIT Campus Map',
      show: false
    },
    tour: {
      label: 'Guided tour',
      icon: '',
      desc: 'Take a preset trip with a video tour guide',
      show: false
    },
    playground: {
      label: 'Playground',
      icon: '',
      desc: 'Explore UOIT\'s latest web experiments in 3D',
      show: false
    },
    settings: {
      label: 'Settings',
      icon: '',
      desc: 'Adjust the Virtual Tour experience',
      show: false
    }
  };

  //s.toggleMenu = buildToggler('right');
  //s.toggleConfig = buildToggler('config');

  s.isMenuOpen = function(navID){
    return $mdSidenav(navID).isOpen();
  };

  s.toggleMenu = function(navID, view) {
    // return function() {
    if (view && !s.menuViews[view].show) {
      angular.forEach(s.menuViews, function(v) { v.show = false; });
      s.menuViews[view].show = true;
      if (!$mdSidenav(navID).isOpen()) {
        $mdSidenav(navID).open();
      }
    } else {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          // $log.debug("toggle " + navID  + " is done");
        }
      );
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
