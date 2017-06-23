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
			ng-class="{ 'is-active': item._active, 'is-hidden': item._hidden }"
			md-ink-ripple="{{ item._active ? false : '#003C71' }}">
			<div ng-if="!item._hidden" style="padding-right: 30px;" class="drilldown-content" ng-class="{'md-caption': item._active, 'md-title': !item._active, 'selected': item.selected }">
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
  	toggleAll(except) {
  		this.children.forEach(child => {
				child._active = (child === except);
				child._hidden = !(child === except);
  		});
  	}
  	closeAll() {
  		this.children.forEach(child => {
				child._active = child._hidden = false;
  		});
  	}
  	toggle(event, item, level) {
			event.stopPropagation();
  		console.log('[drilldown.controller] toggle', item, level)
			if (!item._active) {
				this.toggleAll(item);
				this.$state.go(item._level, item._params);
			} else {
				this.closeAll();
			}
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
