function builderCtrl($scope, $mdDialog, $timeout, $mdToast) {
	'ngInject';

  const bc = this;
  
  // ADD ATTRIBUTE MENU
  let originatorEv;
  bc.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  bc.menuOptions = [{
    category: 'All',
    props: [{
      name: 'position',
      default: [0, 0, 0]
    },{
      name: 'rotation',
      default: [0, 0, 0]
    },{
      name: 'scale',
      default: [0, 0, 0]
    }]
  },{
    category: 'Geometry',
    props: [{
      name: 'translate',
      default: [0, 0, 0]
    },
      'Box',
    {
      name: 'width',
      default: 1
    }, {
      name: 'height',
      default: 1
    }, {
      name: 'depth',
      default: 1
    },
      'Circle',
    {
      name: 'radius',
      default: 1
    },{
      name: 'segments',
      default: 32
    },{
      name: 'thetaStart',
      default: 0
    },{
      name: 'thetaLength',
      default: 360
    }]
  }];

  let draftMsg = $mdToast.simple()
    .textContent('Draft automatically saved!')
    .action('LOCK IN CHANGES')
    .highlightAction(true)
    // .highlightClass('md-primary')
    .position('bottom left');

  let debouncer = function() {
  	return $timeout(function() {
	    $mdToast.show(draftMsg).then(function(response) {
	      if ( response == 'ok' ) {
	        alert('You clicked the \'UNDO\' action.');
	      }
	    });
	  }, 5000);
  }
  let debounceToken;
  bc.onChange = function () {
  	$timeout.cancel(debounceToken);
  	debounceToken = debouncer();
  }

  bc.editorOpts = {
  	mode: 'tree',
  	onChange: bc.onChange
  }

}

export default {
  name: 'builderCtrl',
  fn: builderCtrl
};