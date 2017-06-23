import { utils } from 'aframe';
import { element, isUndefined } from 'angular';

function AppController(
	$scope, $state, $timeout, // ng deps
	$mdSidenav, $mdMedia, // md deps
	$popupWindow, UserSession, DrilldownService, // my libs
	BUTTONBAR_VIEWS, TITLEBAR_OPTS // consts
) {
  'ngInject';
  const WELCOME_MSG_DELAY = 500; //ms
  const SETTINGS_MSG_DELAY = 1000; //ms
  const BLURRED_VIEWS = [ 'search', 'map' ];
  // check for mobile/landscape on every digest
  this.mobile = {};
  $scope.$watch(
    () => ({
    	screen: !$mdMedia('gt-sm'),
    	landscape: $mdMedia('landscape'),
    	device: utils.device.isMobile()
    }),
    m => {
      this.mobile = m; //console.log(m);
    },
    true
  );

	const goToSettings = response => {
		switch (response) {
			case 'ok':
        $state.go('settings');
        $mdSidenav('right').open();
			default:
				break;
		}
	}

  const showSettingsMsg = () => {
  	const autoconfig = UserSession.usage.auto;
  	if (autoconfig && autoconfig.val) {
	    $popupWindow.toast('primary', {
	    	message: 'Data usage settings auto-configured to your device!',
	    	action: 'Change settings'
	    }).then(response => {
	    	goToSettings(response);
	    });
  	} else {
	    $popupWindow.toast('warn', {
	    	message: 'Automatic data usage is currently disabled, but can be enabled in Settings.',
	    	action: 'Show me how'
	    }).then(response => {
	    	goToSettings(response);
	    });
	  }
  }

  const showWelcomeMsg = () => {
		$popupWindow.welcome()
	    .then( answer => (answer != 'tour') && showSettingsMsg() )
	    .catch( () => showSettingsMsg() );
  }

  const settingsLoaded = $scope.$watch(
  	() => UserSession.settings, 
  	userSettings => {
	  	if (!isUndefined(userSettings)) {
	  		console.log('main controller applying settings')
			  const { showWelcome, toolbarOpen, toolbarCondensed } = UserSession.settings;

				if (showWelcome.val) {
				  $timeout(showWelcomeMsg, WELCOME_MSG_DELAY);
				} else {
				  $timeout(showSettingsMsg, SETTINGS_MSG_DELAY);
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
			  	sidebar: $mdSidenav('right'),
			  	views: BUTTONBAR_VIEWS,
			  	currentView: '',
			    open: toolbarOpen.val,
			    condensed: toolbarCondensed.val,
			    toggle() {
			  		this.open = !this.open;
			  		this.open && this.sidebar.close();
			    },
			    condense() {
			      !this.open&&this.toggle();
			      this.condensed = !this.condensed;
			      return this.condensed;
			    },
			    onSelect(state) {
				    if (this.sidebar.isOpen() && this.currentView === state) {
				      this.sidebar.close();
				    } else {
					    this.sidebar.open();
				    }
			    	this.currentView = state;
			    	console.log('[app.controller] toolbar.onSelect', this.currentView)
			    },
			    hasState(state) {
			    	return (this.currentView === state);
			    },
			    get hasBlur() {
			  		return BLURRED_VIEWS.some(this.hasState.bind(this));
			    }
			  }
			  DrilldownService.getDrilldown().then(structure => {
				  this.drilldown = {
				  	structure
				  };
			  })

			  settingsLoaded();
	  	}
	  }
  );

}


export default AppController;
