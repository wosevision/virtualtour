export const DrilldownComponent = {
  // template,
  template: `<md-content
		class="drilldown-menu"
		ng-init="$ctrl.level = $ctrl.level + 1">
		<div ng-if="!$ctrl.children.length" style="padding-right: 30px;" class="drilldown-content">
			<span class="md-title">No results found!<br/>
			<strong class="md-caption">&laquo; Back</strong></span>
		</div>
		<div
			class="drilldown-item"
			ng-repeat="item in $ctrl.children"
			ng-click="$ctrl.toggle($event, item, $ctrl.level)"
			ng-class="{ 'is-active': item._active, 'is-hidden': item.hidden }"
			md-ink-ripple="{{ item._active ? false : '#003C71' }}">
			<div ng-if="!item.hidden" style="padding-right: 30px;" class="drilldown-content" ng-class="{'md-caption': item.active, 'md-title': !item.active, 'selected': item.selected }">
				<span>{{ ::item.name }}</span>
				<div class="open-indicator"></div>
			</div>
			<drilldown-menu ng-if="item._active" children="item.children" level="$ctrl.level"></drilldown-menu>
		</div>
	</md-content>`,
  controller: class DrilldownController {
  	constructor($state) {
  		'ngInject';
  		this.$state = $state;
  	}
  	toggle(event, item, level) {
			event.stopPropagation();
			item._active = !item._active;
			this.$state.go(item._level, item._params);
  		console.log('[drilldown.controller] toggle', item, level)
  	}
  	// $onInit() {
  	// 	console.log('[drilldown.controller] $onInit', this)
  	// }
  },
	bindings: {
		children: '<',
		level: '<'
	},
	// controllerAs: 'item'
};
