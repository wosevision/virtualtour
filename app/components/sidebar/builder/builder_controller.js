import { isUndefined } from 'angular';

function BuilderCtrl($scope, $mdDialog, $timeout, $mdToast, $aframeScene, SceneResource) {
	'ngInject';

	// CONSTANTS
  const draftMsg = $mdToast.simple()
    .textContent('Draft saved automatically')
    .action('Publish changes')
    .highlightAction(false)
    .highlightClass('md-primary')
    .position('bottom left');
  const publishMsg = $mdToast.simple()
    .textContent('Changes published!')
    .action('Dismiss')
    .position('bottom left');
  const discardMsg = $mdToast.simple()
    .textContent('Draft discarded.')
    .action('Dismiss')
    .position('bottom left');

  // INIT VARS
  let draftTimeout;
	this.changesMade = false;

	// INIT FUNCTION
	let initLoaded = $scope.$watch('bc.currentData', (newVal) => {
		if (!isUndefined(newVal) && newVal._id) {
			console.log('Editor loaded data:', newVal);
			this.lastPublished = this.lastDraft = newVal;
			initLoaded();
		}
	});

	// PUBLISH
  this.publishChanges = () => {
  	SceneResource.update({ 
  		id: this.currentData._id
  	}, this.currentData).$promise
		.then(scene => {
  		$timeout.cancel(draftTimeout);
			this.changesMade = false;
			this.lastPublished = this.currentData || scene;
  		$mdToast.show(publishMsg);
  	});
	}

	// DRAFT
  this.saveDraft = () => {
  	this.lastDraft = this.currentData;
    $mdToast.show(draftMsg).then(response => {
      if ( response == 'ok' ) {
      	this.publishChanges();
      }
    });
  }

  // REVERT
	this.revertDraft = () => {
  	$timeout.cancel(draftTimeout);
		this.changesMade = false;
		this.currentData = this.lastPublished || this.currentData;
		$mdToast.show(discardMsg);
	}

	// CHANGE HANDLER
  this.onChange = data => {
  	$timeout.cancel(draftTimeout);
  	this.changesMade = true;
  	draftTimeout = $timeout( () => {
  		this.saveDraft();
	  }, 3000);
  }

  // FINAL CONFIG
  this.editorDefaults = {
  	mode: 'tree',
  	onChange: this.onChange
  }

}

export default {
  name: 'BuilderCtrl',
  fn: BuilderCtrl
};