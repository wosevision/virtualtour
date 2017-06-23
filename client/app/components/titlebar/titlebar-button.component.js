export const TitleBarButtonComponent = {
  require: '^titleBar',
  bindings: {
  	onClick: '&',
  	label: '@',
		class: '@',
  	active: '<',
		tooltip: '<',
		icon: '<'
  },
  template: `<md-button
		class="icon-button {{ ::$ctrl.class }}"
		ng-click="$ctrl.onClick()"
		ng-class="{ 'active': $ctrl.active }"
		aria-label="{{ ::label }}">
	  <ng-md-icon
	  	icon="{{ $ctrl.active ? $ctrl.icon[0] || $ctrl.icon : $ctrl.icon[1] || $ctrl.icon }}"
	  	style="fill: currentColor;">
	  </ng-md-icon>
	  <md-tooltip md-direction="bottom" md-autohide ng-if="$ctrl.tooltip && !(mc.mobile||!$ctrl.settings.showHints.val)">
	    {{ $ctrl.active ? ($ctrl.tooltip[0] || $ctrl.tooltip) : ($ctrl.tooltip[1] || $ctrl.tooltip) }}
	  </md-tooltip>
		<span ng-if="::(!$ctrl.tooltip)">{{ ::$ctrl.label }}</span>
	</md-button>`
};
