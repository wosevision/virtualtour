import { isUndefined, equals, element } from 'angular';
let draftTimeout;

class EditorCtrl {
	static get $inject() {
		return [
			'$scope', '$timeout', 
			'$mdPanel', '$mdToast',
			'SceneResource', 'DraftFactory'];
	}
	constructor(
		$scope, $timeout, 
		$mdPanel, $mdToast,
		SceneResource, DraftFactory
	) {

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
		this.$mdPanel = $mdPanel;
		this.$timeout = $timeout;
		this.$mdToast = $mdToast;
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
		//
		const SceneCtrl = this.SceneCtrl;
		const contextMenu = ev => {
		  ev.stopPropagation();
			if (!SceneCtrl._rightClick) {
				SceneCtrl._rightClick = ev;
				ev.preventDefault();
				SceneCtrl.$sceneEl.on('mouseup', () => {
					SceneCtrl._rightClick = false;
					SceneCtrl.$sceneEl.off('mouseup')
				});
			}
		};
		SceneCtrl.$sceneEl.on('contextmenu', contextMenu);
		//
		SceneCtrl._editable = true;
		SceneCtrl.openEditor = (ev, locals) => {
			// Animation to open dialog from and close to right click
			// Position to hold in bottom left of screen
			const position = this.$mdPanel.newPanelPosition()
	      .absolute()
	      .bottom(0)
	      .left(0);
	    const animation = this.$mdPanel.newPanelAnimation()
	      .openFrom({top: ev.clientY - 150, left: ev.clientX})
	      .withAnimation(this.$mdPanel.animation.SCALE)
	      .closeTo({top: ev.clientY - 150, left: ev.clientX});
	    const attachTo = element(document.body);
	    const onDomRemoved = () => {
				this.panelRef&&this.panelRef.destroy();
			};
	    // Build dialog config
			const config = {
				templateUrl: 'aframe/editor/_editor-dialog.html',
				panelClass: 'demo-menu-example',
				controller: 'EditorDialogCtrl',
			  bindToController: true,
			  controllerAs: '$ctrl',
				clickOutsideToClose: true,
				escapeToClose: true,
				focusOnOpen: true,
				zIndex: 85,
				onDomRemoved,
				position,
				animation,
				attachTo,
				locals
			};
	    this.$mdPanel.open(config)
	      .then(result => {
	        this.panelRef = result;
	      });
		}
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
  name: 'EditorCtrl',
  fn: EditorCtrl
};