import angular from 'angular';
import ngMaterial from 'angular-material';
// import nzTour from 'nz-tour';

import template from './welcome.html';
import controller from './welcome.controller';
import './welcome.scss';

let welcomeModule = angular.module('popup.welcome', [
  ngMaterial,
  // nzTour
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
      clickThrough: false, 
      clickExit: true,
      scrollThrough: false,
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
      target: '#toolbar-controls',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: 'The button toolbar below and to the right can be <strong>expanded, condensed, or hidden entirely</strong> with the buttons to the right-hand side here.<br/><br/>Don\' forget to <strong>register your user account</strong> for future visits or <strong>book a real tour</strong> at the university!'
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
			image: 'images/tip-scene_link.gif',
			content: `<p class="md-body-1">Around the Tour, you will find many <strong>blue arrows</strong> <ng-md-icon icon="near_me" size="14" style="fill:#0077CA"></ng-md-icon>
				pointing to different areas. They are called <strong>scene links</strong>; use them to travel.
				<p class="md-body-1">Move your cursor over a scene link to highlight it, and click it to travel in the
				direction it's pointing.`
		},{
			label: 'Location menu',
			image: 'images/tip-location_menu.gif',
			content: `<p class="md-body-1">The <ng-md-icon icon="pin_drop" size="14" style="fill:#666"></ng-md-icon> button 
				on the far-right bar opens the <strong>location menu</strong>.</p>
				<p class="md-body-1">Navigate by picking a location; choose a building to list scenes
				from; click a scene to view it.</p>
				<p class="md-body-1">Use this menu to jump to a scene or between far-away scenes. Close
				the menu by clicking the <ng-md-icon icon="pin_drop" size="14" style="fill:#666"></ng-md-icon> button again.</p>`
		},{
			label: 'Campus map',
			image: 'images/tip-campus_map.gif',
			content: `<p class="md-body-1">The Tour's built-in <strong>Campus Map</strong> can be used to navigate the Tour.</p>
				<p class="md-body-1">The <ng-md-icon icon="map" size="14" style="fill:#666"></ng-md-icon> button 
				on the far-right bar opens the Map.
				<p class="md-body-1">Choose a building on the map by clicking it; click the <strong>Take a tour »</strong> button
				in the building info to go to that building's first scene.`
		}]
	},
	poi: {
		title: ''
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
