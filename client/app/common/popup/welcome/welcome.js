import angular from 'angular';
import ngMaterial from 'angular-material';
import 'nz-tour';

import template from './welcome.html';
import controller from './welcome.controller';
import './welcome.scss';

let welcomeModule = angular.module('popup.welcome', [
  ngMaterial,
  'nzTour'
])

.config(($mdDialogProvider) => {
  'ngInject';
	
	$mdDialogProvider.addPreset('welcome', {
	  options() {
	    return {
	    	template,
	    	controller,
	    	parent: angular.element(document.body),
	      controllerAs: '$ctrl',
	      bindToController: true,
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
	    }
	  }
	});
})

.constant('TOUR_STEPS', {
  config: {
    mask: {
      visible: true,
      visibleOnNoTarget: true,
      clickThrough: false, 
      clickExit: true,
      scrollThrough: true,
      color: 'rgba(0,60,113,.7)'
    },
    container: 'body',
    scrollBox: 'body',
    previousText: 'Previous',
    nextText: 'Next',
    finishText: 'Finish',
    animationDuration: 400,
    dark: true
  },
  steps: [{
      target: '#locations',
      placementPriority: [ 'top', 'left', 'bottom', 'right' ],
      content: '<h3>This is the location menu.</h3>UOIT locations can be explored manually using an expanding location menu. <strong>Click this button to open it!</strong>'
  }, {
      target: '#map',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>Explore locations on the campus map!</h3>The same locations featured above are layed out on an <strong>interactive map, available in this menu</strong>.'
  }, {
      target: '#search',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>Not sure where to start?</h3>If you have an idea of something you\'re looking for, <strong>try searching for it</strong>.'
  }, {
      target: '#titlebar-btn-condense',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: 'The right-hand toolbar below can be <strong>expanded or condensed</strong> with this button...'
  }, {
      target: '#titlebar-btn-right',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: '...or <strong>hidden entirely</strong> with this button.<br/><br/><strong>Use these if you end up needing more viewing space!</strong>'
  }, {
      target: '#toolbar-controls',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: 'The Virtual Tour is <strong>just the start</strong> of your UOIT adventure.<br/><br/>Don\'t forget to <strong>register your user account</strong> for future visits, <strong>book a real tour</strong> at the University, or <strong>apply</strong> to come experience it fully!'
  }, {
      target: '#settings',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: 'If you want your preferences saved for future visits, you can <strong>configure your own personal settings</strong> for the Virtual Tour experience here!'
  }, {
      // target: '#aframe-scene',
      placementPriority: [ 'bottom', 'top', 'left', 'right' ],
      content: 'Would you like to learn how to navigate through <strong>scenes</strong>?<br/><div class="text-center" layout-margin><md-button class="md-raised md-primary">Show me how</md-button><md-button>No thanks</md-button></div>'
  }]
})

.constant('WELCOME_TIPS', {
	navigation: {
		title: ['Learn how to', 'Navigate the Tour!'],
		tips: [{
			label: 'Scene links',
			image: 'assets/images/tutorial/tip-scene_link.gif',
			content: `<p class="md-subhead">Around the Tour, you will find many <strong>blue arrows</strong> <ng-md-icon icon="near_me" size="16" style="fill:#0077CA"></ng-md-icon>
				pointing to different areas. They are called <strong>scene links</strong>; use them to travel.
				<p class="md-subhead">Move your cursor over a scene link to highlight it, and click it to travel in the
				direction it's pointing.`
		},{
			label: 'Location menu',
			image: 'assets/images/tutorial/tip-location_menu.gif',
			content: `<p class="md-subhead">The <ng-md-icon icon="pin_drop" size="16" style="fill:#666"></ng-md-icon> button 
				on the far-right bar opens the <strong>location menu</strong>.</p>
				<p class="md-subhead">Navigate by picking a location; choose a building to list scenes
				from; click a scene to view it.</p>
				<p class="md-subhead">Use this menu to jump to a scene or between far-away scenes. Close
				the menu by clicking the <ng-md-icon icon="pin_drop" size="16" style="fill:#666"></ng-md-icon> button again.</p>`
		},{
			label: 'Campus map',
			image: 'assets/images/tutorial/tip-campus_map.gif',
			content: `<p class="md-subhead">The Tour's built-in <strong>Campus Map</strong> can be used to navigate the Tour.</p>
				<p class="md-subhead">The <ng-md-icon icon="map" size="16" style="fill:#666"></ng-md-icon> button 
				on the far-right bar opens the Map.
				<p class="md-subhead">Choose a building on the map by clicking it; click the <strong>Take a tour »</strong> button
				in the building info to go to that building's first scene.`
		}]
	},
	poi: {
		title: ''
	},
	accessibility: {
		title: ['Get started with', 'Virtual Tour accessibility'],
		tips: [{
			label: 'Keyboard',
			// image: 'assets/images/tip-scene_link.gif',
			content: `<p class="md-subhead">The Virtual Tour provides full keyboard navigation and interaction!</p>
				<p class="md-subhead">Users accustomed to assitive devices like screen readers should feel very little difference between navigating the Tour and navigating a webpage:</p>
				<ul><li>Use the <kbd>↹ Tab</kbd> (or the inverse <kbd>⇧ Shift</kbd><kbd>↹ Tab</kbd>) key to jump focus between "live" elements (like buttons, links and controls)</li>
				<li>The arrow keys provide supplementary navigation between related content within a focused element (like tabs and dropdowns)</li>
				<li>Press <kbd>↵ Return</kbd> or <kbd>Space</kbd> to activate a focused element, and <kbd>⎋ Esc</kbd> to close or hide elements</li>
				<li><strong>The whole tour is keyboard-navigable</strong> – the interface <strong>and</strong> the Tour itself offer full control with the same keys!</li></ul>`
		},{
			label: 'Described',
			// image: 'assets/images/tip-scene_link.gif',
			content: `<p class="md-subhead">All Virtual Tour points of interest are labelled and described for the visually impaired.</p>
				<p class="md-subhead">Non-sighted users can enjoy the tour using its labelling and descriptions to replace visual cues. The Tour includes non-visual aids for:</p>
				<ul><li><strong>Buttons and menus:</strong> non-text button uses are described</li>
				<li><strong>Hot spots and scene links:</strong> include screen-reader-accessible text</li>
				<li><strong>Scenes:</strong> <em class="uoit-blue-light"><small>(coming soon)</small></em> audio description of the current scene being viewed can be announced (requires preference to be enabled in user settings) <md-button class="md-primary" ng-click="$ctrl.goToSettings()">Where's that?</md-button></ul>`
		}]
	}
})

.constant('WELCOME_TIP_LIST', [
	[{
		title: 'Tour navigation',
		icon: 'my_location',
		link: 'navigation',
		desc: 'Learn how to use warp arrows, map view and the location menu to move from scene to scene.',
	},{
		title: 'Points of interest',
		icon: 'place',
		link: '',
		desc: 'See which tour elements offer interactivity and how to use them.',
	}],[{
		title: 'Virtual reality',
		icon: '3d_rotation',
		link: '',
		desc: 'Experience the UOIT virtual tour immersively with an Oculus© Rift.',
	},{
		title: 'Mobile VR',
		icon: 'screen_rotation',
		link: '',
		desc: 'Turn your smartphone into a portal to UOIT with a mobile VR peripheral like HTC Vive, Samsung Gear or Google Cardboard.',
	},{
		title: 'Customization',
		icon: 'settings',
		link: '',
		desc: 'Learn about the options available for fine-tuning the virtual tour interface.'
	}]
])

.name;
export default welcomeModule;
