import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

import { ErrorController as controller} from './error.controller';
import template from './error.html';

import './error.scss';

export const ErrorModule = angular.module('popup.error', [
  uiRouter,
  ngSanitize,
  ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';

	$mdDialogProvider.addPreset('error', {
	  options() {
	    return {
	    	template,
	    	controller,
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true,
	    	parent: angular.element(document.body)
	    };
	  }
	})
})

.constant('ERROR_SUGGESTIONS', [{
	title: `Clear your <md-select 
		style="display:inline-block;min-width:130px;"
		ng-model="item.params"
		placeholder="browser"
		class="md-no-underline">
	  <md-option value="gc">Google Chrome</md-option>
	  <md-option value="ie">Internet Explorer</md-option>
	  <md-option value="ff">Firefox</md-option>
	  <md-option value="sa">Safari</md-option>
	  <md-option value="op">Opera</md-option>
	  <md-option value="other">Other browser</md-option>
	</md-select> cache`,
	desc: 'Clearing your browser cache is a non-invasive troubleshooting step that resolves many simple web issues.',
	icon: 'delete_forever',
	action(browser) {
		let url = 'http://www.refreshyourcache.com';
		switch (browser) {
			case 'gc':
				url = 'https://support.google.com/accounts/answer/32050';
				break;
			case 'ie':
				url = 'https://support.microsoft.com/en-us/kb/260897';
				break;
			case 'ff':
				url = 'https://support.mozilla.org/en-US/kb/how-clear-firefox-cache';
				break;
			case 'sa':
				url = 'https://support.apple.com/en-us/HT204098';
				break;
			case 'op':
				url = 'http://help.opera.com/opera/Windows/2256/en/private.html#deleteData';
				break;
			default:
				break;
		}
		window.open(url,'_blank');
	}
},{
	title: 'Wait a little while and try again',
	desc: 'If the server is busy or not responding, it usually resolves itself after a short amount of time.',
	icon: 'hourglass_empty'
},{
	title: 'Adjust the tour data usage settings',
	desc: 'If the tour is taking too long to load, you can customize its loading behaviour to better suit your situation.',
	icon: 'data_usage',
	goToSettings: true
},{
	title: 'Double check the URL',
	desc: 'Is the address of the page what you expected it to be? Ensure it starts with https:// and free of spelling errors.',
	icon: 'hourglass_empty'
},{
	title: 'Refresh the page',
	desc: 'If the page has encountered a minor issue but cannot proceed past it, refreshing the browser will often solve the issue.',
	icon: 'hourglass_empty'
}])

.name;
