import { utils } from 'aframe';
import { element, isUndefined } from 'angular';

function MainCtrl(
	$scope, $state, $timeout, // ng deps
	$mdSidenav, $mdMedia, // md deps
	$popupWindow, UserSession, // my libs
	BUTTONBAR_VIEWS, TITLEBAR_OPTS // consts
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

  const showSettingsMsg = () => {
    $popupWindow.toast('warn', {
    	message: 'Data usage settings auto-configured to your device!',
    	action: 'Change settings'
    }).then(response => {
      if ( response == 'ok' ) {
        $state.go('settings');
        $mdSidenav('right').open();
      }
    });
  }

  const WELCOME_DELAY = 500; //ms
  const showWelcomeMsg = () => {
		$popupWindow.welcome()
	    .then( answer => (answer != 'tour') && showSettingsMsg() )
	    .catch( () => showSettingsMsg() );
  }

  $scope.userSettings = UserSession.settings;
  const settingsLoaded = $scope.$watch(() => UserSession.settings, userSettings => {
  	if (!isUndefined(userSettings)) {
  		console.log('main controller applying settings')
		  const { showWelcome, toolbarOpen, toolbarCondensed } = UserSession.settings;

			if (showWelcome.val) {
			  $timeout(showWelcomeMsg, WELCOME_DELAY);
			}

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
		    isOpen: toolbarOpen.val,
		    isCondensed: toolbarCondensed.val,
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

		  settingsLoaded();
  	}
  });

}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
