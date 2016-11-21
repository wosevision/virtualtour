import { isUndefined, equals } from 'angular';
let draftTimeout;

class BuilderCtrl {
	static get $inject() {
		return [
			'$scope', '$timeout', 
			'$mdDialog', '$mdToast', 
			'$aframeScene', 'SceneResource', 'DraftFactory'];
	}
	constructor(
		$scope, $timeout, 
		$mdDialog, $mdToast,
		$aframeScene, SceneResource, DraftFactory
	) {
		'ngInject';

		// CONSTANTS
	  this.draftMsg = $mdToast.simple()
	    .textContent('Draft saved automatically')
	    .action('Publish changes')
	    .highlightAction(false)
	    .highlightClass('md-primary')
	    .position('bottom left');
	  this.loadDraftMsg = $mdToast.simple()
	    .textContent('Autosaved draft found!')
	    .action('Load saved draft')
	    .highlightAction(true)
	    .highlightClass('md-primary')
	    .position('bottom left');
	  this.publishMsg = $mdToast.simple()
	    .textContent('Changes published!')
	    .action('Dismiss')
	    .position('bottom left');
	  this.discardMsg = $mdToast.simple()
	    .textContent('Draft discarded.')
	    .action('Dismiss')
	    .position('bottom left');
	  this.loadedMsg = $mdToast.simple()
	    .textContent('Draft loaded!')
	    .action('Dismiss')
	    .position('bottom left');

	  // INIT VARS
		this.unpublishedChanges = false;

		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
		this.$timeout = $timeout;
		this.$mdToast = $mdToast;
		this.$aframeScene = $aframeScene;
		this.SceneResource = SceneResource;
		this.DraftFactory = DraftFactory;

		// CHANGE HANDLER
	  this.onChange = data => {
	  	$timeout.cancel(draftTimeout);
	  	this.unpublishedChanges = true;
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
	$onInit() {
		// INIT FUNCTION
		let initLoaded = this.$scope.$watch('bc.sceneData', (newVal) => {
			if (!isUndefined(newVal) && newVal._id) {
				const savedDraft = this.DraftFactory.get(this.sceneData._id);
				if (savedDraft) {
	  			this.$mdToast.show(this.loadDraftMsg).then(response => {
			      if ( response == 'ok' ) {
							this.loadDraft();
							this.$mdToast.show(this.loadedMsg)
			      }
			    });
				} else {
					this.lastPublished = newVal;
				}
				initLoaded();
			}
		});
	}
	publishChanges() {
  	this.SceneResource.update({ 
  		id: this.sceneData._id
  	}, this.sceneData)
  	.$promise.then(scene => {
  		this.$timeout.cancel(draftTimeout);
			this.lastPublished = this.sceneData || scene;
			this.discardDraft()
	  	this.unpublishedChanges = false;
  		this.$mdToast.show(this.publishMsg);
  	});
	}
	loadDraft() {
		if (this.lastDraft) {
			this.sceneData = this.lastDraft;
		} else {
			this.sceneData = this.DraftFactory.get(this.sceneData._id) || this.lastPublished;// || this.sceneData;
		}
  	this.unpublishedChanges = !equals(this.sceneData, this.lastPublished);
	}
	discardDraft() {
  	this.lastDraft = null;
  	this.DraftFactory.set(this.sceneData._id, null);
	}
	revertDraft() {
  	this.$timeout.cancel(draftTimeout);
		this.loadDraft();
		this.$mdToast.show(this.discardMsg);
	}
	saveDraft() {
  	this.lastDraft = this.sceneData;
  	this.DraftFactory.set(this.sceneData._id, this.sceneData);
    this.$mdToast.show(this.draftMsg).then(response => {
      if ( response == 'ok' ) {
      	this.publishChanges();
      }
    });
  }
}

export default {
  name: 'BuilderCtrl',
  fn: BuilderCtrl
};