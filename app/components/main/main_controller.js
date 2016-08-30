function MainCtrl(
	$rootScope, $scope, $state, $timeout, $log,
	$mdComponentRegistry, $mdSidenav, $mdToast,
	SceneResource, $aframeScene, testScene,
	GLOBAL_SETTINGS, BUTTONBAR_VIEWS, TITLEBAR_OPTS
) {
  'ngInject';
  // ViewModel

  // MainCtrl reference
  const mc = this;
  mc.activeScene = {};

  // screen and (max-device-width: 767px) and (orientation: landscape)
  // check for mobile/landscape on every digest
  $scope.$watch(
    () => {
      let m;
      if (window.matchMedia('screen and (max-device-width: 767px)').matches) {
        m = true;
        if (window.matchMedia('screen and (orientation: landscape)').matches) {
          m = 'landscape';
        }
        return m;
      }
      //return window.matchMedia('screen and (max-device-width: 767px) and (orientation: landscape)').matches;
    },
    m => {
      $rootScope.mobile = m;
      //console.log(m);
    }
  );

  mc.welcomeMsg = function() {
    var toast = $mdToast.simple()
      .textContent(`Welcome!
      	We've configured the Virtual Tour's data usage settings according to your device's optimal range.`)
      .action('CHANGE SETTINGS')
      .highlightAction(true)
      // .highlightClass('md-primary')
      .position('bottom left');
      // console.log(toast);
    $mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        alert('You clicked the \'UNDO\' action.');
      }
    });
  };

  mc.gotoScene = (location, code, id) => {
    //console.log($state);
    $state.go('scene', { location, code, id });
    // SceneResource.get({ id: id }, data => {
    // 	// $aframeScene.setScene(data.scene, id);
    // 	// $scope.activeScene = $aframeScene.scene;
    // 	mc.activeScene = data.scene;
    // 	//console.log($scope.activeScene);
    // });
  }

  // $timeout(function() {
  // 	mc.gotoScene('north', 'ua', 'ua_int_2a');
  // 	// mc.activeScene = testScene['2a'];
  // }, 1000)
  // 	.then(function() {
  		mc.welcomeMsg();
  // 		return $timeout(function() {
  // 			mc.gotoScene('north', 'ua', 'ua_int_3a');
		//   	// mc.activeScene = testScene['3a'];
		//   }, 1000);
  // 	});

  mc.titlebar = {
		options: TITLEBAR_OPTS,
		clickHandlers: {
			config: () => {
      	$mdSidenav('config').toggle();
			},
			right: () => {
		    mc.toolbar.toggle();
      	mc.titlebar.options.right.active = mc.toolbar.isOpen;
			},
			condense: () => {
		    mc.toolbar.condense();
      	mc.titlebar.options.condense.active = mc.toolbar.isCondensed;
			}
		} 
  }

  mc.toolbar = {
  	views: BUTTONBAR_VIEWS,
    isOpen: $rootScope.appSettings.USER._TOOLBAR_OPEN.val || true,
    isCondensed: $rootScope.appSettings.USER._TOOLBAR_CONDENSED.val || true,
    toggle() {
  		this.isOpen = !this.isOpen;
  		this.isOpen&&$mdSidenav('right').close();
    },
    condense() {
      !this.isOpen&&this.toggle();
      this.isCondensed = !this.isCondensed;
      return this.isCondensed;
    }
  }
}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
