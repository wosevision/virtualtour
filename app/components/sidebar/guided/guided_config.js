function GuidedTourConfig($stateProvider) {
  'ngInject'

	$stateProvider
    .state('guided', {
      parent: 'home',
      url: '/',
      component: 'drilldownMenu',
      resolve: {
      	children() {
      		return [{
      			name: 'Innovating excellence at ACE'
      		},{
      			name: 'Gourmet grand tour: on-campus eats'
      		},{
      			name: 'Sustainability at UOIT'
      		}]
      	},
      	nextLevel() {
      		return 'tour';
      	}
      }
    });
}

export default {
  name: 'GuidedTourConfig',
  fn: GuidedTourConfig
};