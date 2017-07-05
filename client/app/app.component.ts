import aframe from 'aframe';

import { AppStateService } from './app-state.service';
import { UserSessionService } from './common/user/user-session.service';
import { DrilldownService } from './components/drilldown/drilldown.service';

import { BUTTONBAR_VIEWS } from './components/buttonbar/buttonbar-views.constant';
import { TITLEBAR_OPTS } from './components/titlebar/titlebar-options.constant';

const BLURRED_VIEWS: string[] = [ 'search', 'map' ];
const WELCOME_MSG_DELAY = 500; //ms
const SETTINGS_MSG_DELAY = 1000; //ms

import template from './app.html';

export const AppComponent = {
  template,
  transclude: true,
  restrict: 'E',
  controller: class AppController {

    mobile: object = {};

    titlebar = TITLEBAR_OPTS;

    buttonbar: vt.IButtonbar = {
      views: BUTTONBAR_VIEWS,
      blurredViews: BLURRED_VIEWS,
      currentView: '',
      visible: true,
      condensed: false,
      toggle() {
        this.visible = !this.visible;
        this.visible && this.sidebar.close();
        return this.visible;
      },
      condense() {
        !this.visible&&this.toggle();
        this.condensed = !this.condensed;
        return this.condensed;
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
      private UserSession: UserSessionService,
      private DrilldownService: DrilldownService,
      private AppStateService: AppStateService
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

      await this.AppStateService.init();

      console.info('[app.controller] $onInit AppStateService.init()');

      if (this.UserSession.settings) {
        const { showWelcome, toolbarOpen, toolbarCondensed } = this.UserSession.settings;

        if (showWelcome.val) {
          this.$timeout(this.showWelcomeMsg.bind(this), WELCOME_MSG_DELAY);
        } else {
          this.$timeout(this.showSettingsMsg.bind(this), SETTINGS_MSG_DELAY);
        }

        this.buttonbar.visible = <boolean>toolbarOpen.val;
        this.buttonbar.condensed = <boolean>toolbarCondensed.val;
        this.buttonbar.sidebar = this.$mdSidenav('right');
        this.drilldown = { structure: await this.getDrilldownStructure() };
      }

      console.info('[app.controller] $onInit AppStateService.init()', this.UserSession.settings);
    }

    async getDrilldownStructure() {
      return this.DrilldownService.getDrilldown();
    }
    
    onTitlebarClick(action, option) { 
      console.info('[app.component] buttonClicked', action) 
      option.active = this.buttonbar[action](); 
    }

    onButtonbarSelect(state) {
      console.info('[app.controller] toolbar.onSelect', state);
      if (this.buttonbar.sidebar.isOpen() && this.buttonbar.currentView === state) {
        this.buttonbar.sidebar.close();
      } else {
        this.buttonbar.sidebar.open();
      }
      this.buttonbar.currentView = state;
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
          this.buttonbar.currentView = 'settings';
          this.$mdSidenav('right').open();
        default:
          break;
      }
    }
  }
};
