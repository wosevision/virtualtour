import { utils } from 'aframe';
import { element, isUndefined } from 'angular';

function MainCtrl(
	$rootScope, $scope, $state, $timeout, $log, // ng deps
	$mdComponentRegistry, $mdSidenav, $mdToast, $mdMedia, $mdDialog, // md deps
	$aframeScene, // aframe
	BUTTONBAR_VIEWS, TITLEBAR_OPTS, // consts
	nzTour
) {
  'ngInject';
  // check for mobile/landscape on every digest
  this.mobile = {};
  $scope.$watch(
    () => ({
    	screen: !$mdMedia('gt-sm'),
    	landscape: $mdMedia('landscape'),
    	device: (utils.isMobile || utils.device.isMobile)()
    }),
    m => {
      this.mobile = m; //console.log(m);
    },
    true
  );

  const settingsToast = () => {
    const toast = $mdToast.simple()
      .textContent('Data usage settings auto-configured to your device!')
      .action('CHANGE SETTINGS')
      .highlightAction(true)
      .highlightClass('md-warn')
      .position('bottom left');
    $mdToast.show(toast).then(response => {
      if ( response == 'ok' ) {
        $state.go('settings');
        $mdSidenav('right').open();
      }
    });
  }

  this.welcomeMsg = function() {

    $mdDialog.show({
      controller: 'DialogCtrl',
      templateUrl: 'welcome/_welcome-dialog.html',
      parent: element(document.body),
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
    	answer => (answer != 'tour') && settingsToast()
	  ).catch(
    	() => settingsToast()
	  );
  };

  const WELCOME_DELAY = 500; //ms
  $timeout(
  	() => ($rootScope.appSettings.USER._SHOW_WELCOME.val && this.welcomeMsg()),
	  WELCOME_DELAY
	);

  this.titlebar = {
		options: TITLEBAR_OPTS,
		clickHandlers: {
			config: () => {
      	$mdSidenav('config').toggle();
			},
			right: () => {
		    this.toolbar.toggle();
      	this.titlebar.options.right.active = this.toolbar.isOpen;
			},
			condense: () => {
		    this.toolbar.condense();
      	this.titlebar.options.condense.active = this.toolbar.isCondensed;
			}
		} 
  }

  this.toolbar = {
  	views: BUTTONBAR_VIEWS,
    isOpen: $rootScope.appSettings.USER._TOOLBAR_OPEN.val,
    isCondensed: $rootScope.appSettings.USER._TOOLBAR_CONDENSED.val,
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
