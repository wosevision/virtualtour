import aframe from 'aframe';
import { isUndefined } from 'angular';

import template from './app.html';

export const AppComponent = {
  template,
  controllerAs: 'mc',
  transclude: true,
  restrict: 'E',
  controller: class AppController {

    WELCOME_MSG_DELAY = 500; //ms
    SETTINGS_MSG_DELAY = 1000; //ms
    BLURRED_VIEWS = [ 'search', 'map' ];

    mobile: object = {};

    titlebar = this.TITLEBAR_OPTS.map(option => {
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

    toolbar: vt.IToolbar = {
      views: this.BUTTONBAR_VIEWS,
      blurredViews: this.BLURRED_VIEWS,
      currentView: '',
      open: true,
      condensed: false,
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
        return this.blurredViews.some(this.hasState.bind(this));
      }
    };

    drilldown: { structure: any };

    constructor(
      private $scope, 
      private $state, 
      private $timeout, 
      private $mdSidenav, 
      private $mdMedia, 
      private $popupWindow, 
      private UserSession, 
      private DrilldownService, 
      private BUTTONBAR_VIEWS,
      private TITLEBAR_OPTS
    ) {
      'ngInject';
    }

    async $onInit() {
      this.$scope.$watch(
        () => ({
          screen: !this.$mdMedia('gt-sm'),
          landscape: this.$mdMedia('landscape'),
          device: aframe.utils.device.isMobile()
        }),
        m => {
          this.mobile = m; //console.log(m);
        },
        true
      );

      const settingsLoaded = this.$scope.$watch(
        () => this.UserSession.settings, 
        userSettings => {
          if (!isUndefined(userSettings)) {
            console.info('[app.controller] $watch.userSettings', userSettings)

            const { showWelcome, toolbarOpen, toolbarCondensed } = this.UserSession.settings;

            if (showWelcome.val) {
              this.$timeout(this.showWelcomeMsg.bind(this), this.WELCOME_MSG_DELAY);
            } else {
              this.$timeout(this.showSettingsMsg.bind(this), this.SETTINGS_MSG_DELAY);
            }

            this.toolbar.open = toolbarOpen;
            this.toolbar.condensed = toolbarCondensed;
            this.toolbar.sidebar = this.$mdSidenav('right');

            settingsLoaded();
          }
        }
      );

      this.drilldown = { structure: await this.getDrilldownStructure() };
    }

    async getDrilldownStructure() {
      return this.DrilldownService.getDrilldown();
    }

    showWelcomeMsg() {
      const locals = {
        onButtonClick: (response) => this.processResponse(response)
      };
      this.$popupWindow.welcome({ locals })
        .then( answer => {
          if (answer !== 'tour' && answer !== 'settings') {
            this.showSettingsMsg()
          } else {
            this.processResponse(answer);
          }
        })
        .catch( () => this.showSettingsMsg() );
    }

    showSettingsMsg() {
      const autoconfig = this.UserSession.usage.auto;
      if (autoconfig && autoconfig.val) {
        this.$popupWindow.toast('primary', {
          message: 'Data usage settings auto-configured to your device!',
          action: 'Change settings'
        }).then(response => {
          this.processResponse({ $event: response });
        });
      } else {
        this.$popupWindow.toast('warn', {
          message: 'Automatic data usage is currently disabled, but can be enabled in Settings.',
          action: 'Show me how'
        }).then(response => {
          this.processResponse({ $event: response });
        });
      }
    }

    processResponse({ $event: response }) {
      console.log('[app.controller] processResponse', response);
      switch (response) {
        case 'ok':
        case 'settings':
          this.toolbar.currentView = 'settings';
          this.$mdSidenav('right').open();
        default:
          break;
      }
    }
  }
};
