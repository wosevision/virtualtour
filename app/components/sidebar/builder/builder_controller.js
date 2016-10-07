import { isUndefined } from 'angular';

function builderCtrl($scope, $mdDialog, $timeout, $mdToast, $aframeScene, SceneResource) {
	'ngInject';

  const draftMsg = $mdToast.simple()
    .textContent('Draft saved!')
    .action('Publish changes')
    .highlightAction(false)
    .highlightClass('md-primary')
    .position('bottom left');
  const publishMsg = $mdToast.simple()
    .textContent('Changes published!')
    .action('Dismiss')
    .position('bottom left');
  const discardMsg = $mdToast.simple()
    .textContent('Draft discarded!')
    .action('Dismiss')
    .position('bottom left');

	this.changesMade = false;

  this.publishChanges = () => {
  	SceneResource.update({ 
  		id: this.currentData._id
  	}, this.currentData).$promise
		.then(scene => {
			this.lastPublished = this.currentData = scene;
			this.changesMade = false;
  		$mdToast.show(publishMsg);
  	});
	}

  this.saveDraft = () => {
    $mdToast.show(draftMsg).then(response => {
      if ( response == 'ok' ) {
      	this.publishChanges();
        // alert(JSON.stringify(this.currentData));
      }
    });
  }

	this.revertDraft = () => {
		SceneResource.get({ 
  		id: this.currentData._id
  	}).$promise
		.then(scene => {
			$scope.mc.activeScene = scene;
  	});
		// $scope.mc.activeScene = this.lastPublished;
		// 
		$mdToast.show(discardMsg);
	}

  let draftTimeout;
  this.onChange = data => {
  	$timeout.cancel(draftTimeout);
  	this.changesMade = true;
  	this.currentData = data;
  	draftTimeout = $timeout( () => {
  		this.saveDraft();
	  }, 3000);
  }

  this.editorDefaults = {
  	mode: 'tree',
  	onChange: this.onChange
  }

}

export default {
  name: 'builderCtrl',
  fn: builderCtrl
};