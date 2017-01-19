const WELCOME_TIPS = {
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
}

export default {
	name: 'WELCOME_TIPS',
	fn: WELCOME_TIPS
}