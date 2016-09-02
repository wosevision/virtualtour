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
  mc.markers = [
  	// {
  	// 	type: 'warp-marker',
  	// 	attrs: {
  	// 		position: [ 1, 1, 0 ],
  	// 		rotation: [ 0, 90, 0],
  	// 		scene: 'ua_2a'
  	// 	}
  	// },
  	{
  		type: 'entity',
  		attrs: {
  			position: [ 1, 1, 0 ],
  			rotation: [ 0, 90, 0],
  			'warp-marker': 'ua_2a'
  		}
  	}
  ]

  // screen and (max-device-width: 767px) and (orientation: landscape)
  // check for mobile/landscape on every digest
  mc.mobile = {};
  $scope.$watch(
    () => ({
    	screen: !$mdMedia('gt-sm'),
    	landscape: $mdMedia('landscape'),
    	device: AFRAME.utils.isMobile()
    }),
    m => {
      mc.mobile = m; console.log(m);
    },
    true
  );

  mc.welcomeMsg = function() {
      
    var toast = $mdToast.simple()
      .textContent(`Data usage settings auto-configured to your device!`)
      .action('CHANGE SETTINGS')
      .highlightAction(true)
      .highlightClass('md-warn')
      .position('bottom left');
      // console.log(toast);
    // $mdToast.show(toast).then(function(response) {
    //   if ( response == 'ok' ) {
    //     alert('You clicked the \'UNDO\' action.');
    //   }
    // });

    const tour = {
	    //config: {} // see config
	    steps: [{
	        target: document.getElementById('locations'),
	        content: 'This is the first step!',
	    }, {
	        target: document.getElementById('map'),
	        placementPriority: [ 'right', 'top', 'bottom', 'left' ],
	        content: 'Blah blah blah. I prefer to show up on the right.',
	    }, {
	        target: document.getElementById('settings'),
	        content: 'I guess this is a menu!',
	    }]
		};

    $mdDialog.show({
      controller: 'DialogCtrl',
      templateUrl: 'welcome/_welcome-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      clickOutsideToClose: true,
      openFrom: {
      	top: 18,
      	left: 18,
      	width: 36,
      	height: 60
      },
      closeTo: {
      	top: 18,
      	left: 18,
      	width: 36,
      	height: 60
      }
    })
    .then(
    	(answer) => {

	      $mdToast.show(toast).then(function(response) {
		      if ( response == 'ok' ) {
		        alert('You clicked the \'UNDO\' action.');
		      }
		    });
			}, () => {
	      $mdToast.show(toast).then(function(response) {
		      if ( response == 'ok' ) {
		        alert('You clicked the \'UNDO\' action.');
		      }
		    });
// nzTour.start(tour);
	    }
	  );
  };
  $timeout(
  	() => mc.welcomeMsg(),
	  500
	);

  mc.gotoScene = (location, code, id) => {
    //console.log($state);
    $state.go('scene', { location, code, id });
  }

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
