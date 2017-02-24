import angular from 'angular';
import ngMaterial from 'angular-material';

import titleBarComponent from './titlebar.component';
import titleBarButtonDirective from './titlebarButton.directive';

const titleBarModule = angular.module('titlebar', [
	ngMaterial
])

.component('titleBar', titleBarComponent)

.directive('titleBarButton', titleBarButtonDirective)

.constant('TITLEBAR_OPTS', {
	register: {
		active: true,
		label: 'Register now',
		tooltip: false,
		icon: ['person_outline', 'person_outline'],
		class: 'cta-button bg-pink'
	},
	schedule: {
		active: true,
		label: 'Schedule visit',
		tooltip: false,
		icon: ['add_alarm', 'add_alarm'],
		class: 'cta-button bg-green'
	},
	apply: {
		active: true,
		label: 'Apply online',
		tooltip: false,
		icon: ['bookmark_outline', 'bookmark_outline'],
		class: 'cta-button bg-orange'
	},
	condense: {
		active: true,
		label: 'Toolbar size',
		tooltip: [ 'Expand toolbar', 'Condense toolbar' ],
		icon: [ 'flip_to_front', 'flip_to_back' ]
	},
	right: {
		active: true,
		label: 'Toolbar visibility',
		tooltip: [ 'Hide toolbar', 'Show toolbar' ],
		icon: [ 'last_page', 'first_page' ]
	}
})

.name;

export default titleBarModule;
