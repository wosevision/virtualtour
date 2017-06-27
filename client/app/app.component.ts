import { utils } from 'aframe';
import { isUndefined } from 'angular';

import template from './app.html';

export const AppComponent = {
  template,
  controllerAs: 'mc',
  transclude: true,
  restrict: 'E',
  controller: function AppController(
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
          console.info('[app.controller] $watch.userSettings', userSettings)
          const { showWelcome, toolbarOpen, toolbarCondensed } = UserSession.settings;

          if (showWelcome.val) {
            $timeout(showWelcomeMsg, WELCOME_MSG_DELAY);
          } else {
            $timeout(showSettingsMsg, SETTINGS_MSG_DELAY);
          }

          this.titlebar = TITLEBAR_OPTS.map(option => {
            switch (option.id) {
              case 'right':
                option.onClick = () => {
                  this.toolbar.toggle();
                  option.active = this.toolbar.open;
                };
                break;
              case 'condense':
                option.onClick = () => {
                  this.toolbar.condense();
                  option.active = this.toolbar.condensed;
                };
                break;
            }
            return option;
          });

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
              console.info('[app.controller] toolbar.onSelect', state);
              if (this.sidebar.isOpen() && this.currentView === state) {
                this.sidebar.close();
              } else {
                this.sidebar.open();
              }
              this.currentView = state;
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
};
