import {
  Component,
  Inject,
} from 'ng-metadata/core';
import { isUndefined } from 'angular';
import aframe from 'aframe';

import { AppStateService } from './app-state.service';
import { TITLEBAR_OPTS } from './components/titlebar/titlebar-options.constant';

import template from './app.html';

@Component({
  selector: 'app',
  // moduleId: module.id,
  template,
  legacy: {
    controllerAs: 'mc',
    transclude: true,
  }
})
export class AppComponent {

  WELCOME_MSG_DELAY = 500; //ms
  SETTINGS_MSG_DELAY = 1000; //ms
  BLURRED_VIEWS = [ 'search', 'map' ];

  mobile: object = {};

  titlebar = TITLEBAR_OPTS;

  toolbar: vt.IToolbar = {
    views: this.BUTTONBAR_VIEWS,
    blurredViews: this.BLURRED_VIEWS,
    currentView: '',
    open: true,
    condensed: false,
    toggle() {
      this.open = !this.open;
      this.open && this.sidebar.close();
      return this.open;
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
    @Inject('$scope') private $scope, 
    @Inject('$state') private $state, 
    @Inject('$timeout') private $timeout, 
    @Inject('$mdSidenav') private $mdSidenav, 
    @Inject('$mdMedia') private $mdMedia, 
    @Inject('$popupWindow') private $popupWindow, 
    @Inject('UserSession') private UserSession,
    @Inject('DrilldownService') private DrilldownService, 
    @Inject('BUTTONBAR_VIEWS') private BUTTONBAR_VIEWS,
    private AppStateService: AppStateService
  ) {}

  async $onInit() {

    console.log('App state', this.AppStateService);

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

    this.AppStateService.init()
      .then(userSettings => {
        console.info('[app.controller] $watch.userSettings');

        if (!isUndefined(this.UserSession.settings)) {

          const { showWelcome, toolbarOpen, toolbarCondensed } = this.UserSession.settings;

          if (showWelcome.val) {
            this.$timeout(this.showWelcomeMsg.bind(this), this.WELCOME_MSG_DELAY);
          } else {
            this.$timeout(this.showSettingsMsg.bind(this), this.SETTINGS_MSG_DELAY);
          }

          this.toolbar.open = toolbarOpen.val;
          this.toolbar.condensed = toolbarCondensed.val;
          this.toolbar.sidebar = this.$mdSidenav('right');

          console.info('[app.controller] $watch.userSettings settingsLoaded', this.UserSession.settings);
        }
      });

    this.drilldown = { structure: await this.getDrilldownStructure() };
  }

  async getDrilldownStructure() {
    return this.DrilldownService.getDrilldown();
  }

  buttonClicked(action, option) {
    console.info('[app.component] buttonClicked', action)
    option.active = this.toolbar[action]();
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
