export const TitleBarComponent: ng.IComponentOptions = {
  transclude: true,
  bindings: {
  	title: '@',
  	mobile: '<'
  },
	template: `<md-toolbar id="title-bar" class="md-accent md-hue-1 title-bar" layout="row" ng-class="{'is-mobile' : $ctrl.mobile.screen}">
	  <md-toolbar-filler flex="nogrow" layout layout-align="start center" layout-align-gt-sm="center center">
	    <svg ui-sref="home" alt="University of Ontario Institute of Technology" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 84.86" class="logo-shield" id="uoit_logo" preserveAspectRatio="xMaxYMax meet">
			  <path d="M43.82,82.91c-17.6,0-25.67-15.73-25.67-31.62s8.07-31.62,25.67-31.62c13.27,0,21.11,8.93,24.18,20.15L67.94,0H0L0,51C.71,70.93,15.27,84.86,34,84.86a28.57,28.57,0,0,0,10-2Z"/>
			  <path d="M43.89,22.17c-14.13,0-15.16,19.16-15.16,29.2s1,29.21,15.16,29.21S59,61.42,59,51.37,58,22.17,43.89,22.17Z"/>
			</svg>
	  </md-toolbar-filler>
	  <div class="md-toolbar-tools" ng-if="!$ctrl.mobile.screen">
	    <h1 ui-sref="home">{{::$ctrl.title}} <small class="beta-label">BETA</small></h1>
	    <span flex></span>
	    <ng-transclude id="toolbar-controls" layout layout-align="center center"></ng-transclude>
	  </div>
	</md-toolbar>`
};
