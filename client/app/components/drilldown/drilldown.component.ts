import { $analytics } from 'angulartics';

export const DrilldownComponent = {
	bindings: {
		children: '<'
	},
  controller: class DrilldownController {
  	$analytics: $analytics;

  	children;
  	
  	constructor($analytics: $analytics) {
  		'ngInject';
  		this.$analytics = $analytics;
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

  	toggle(event, item) {
			event.stopPropagation();
  		console.log('[drilldown.controller] toggle', item)
			if (!item._active) {
				item.children && this.toggleAll(item);
				this.$analytics.eventTrack('click', {
					category: 'drilldown',
					label: Object.keys(item._params).map(key => item._params[key]).join('_')
				});
			} else {
				this.closeAll();
			}
  	}
  },
  template: `<md-content
		class="drilldown-menu">
		<div class="drilldown-content"
			style="padding-right: 30px;"
			ng-if="::($ctrl.children && !$ctrl.children.length)">
			<span class="md-title">No results found!<br/>
			<strong class="md-caption">&laquo; Back</strong></span>
		</div>

		<div
			class="drilldown-item"
			ng-repeat="item in ::$ctrl.children"
			ng-click="$ctrl.toggle($event, item)"
			ui-state="::item._level"
			ui-state-params="::item._params"
			ui-sref-active="selected"
			ng-class="{ 'is-active': item._active, 'is-hidden': item._hidden }"
			md-ink-ripple="{{ item._active ? false : '#003C71' }}">
			<div ng-if="!item._hidden" style="padding-right: 30px;" class="drilldown-content" ng-class="{'md-caption': item._active, 'md-title': !item._active }">
				<span>{{ ::item.name }}</span>
				<div class="open-indicator"></div>
			</div>

			<drilldown-menu ng-if="item._active" children="::item.children"></drilldown-menu>
		</div>
	</md-content>`
};
