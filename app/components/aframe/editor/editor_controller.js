import { isUndefined, equals, element } from 'angular';

const attachTo = element(document.body);

/**
 * This controller is only instantiated with the server-rendered
 * editor component. It works by mounting a number of its
 * behaviours onto the scene component's `SceneCtrl` directly
 * and by proxying the `$aframeScene` service.
 * 
 * @param {object} $mdPanel      ng-material's panel service
 * @param {object} $mdDialog     ng-material's dialog service
 * @param {object} $aframeScene  The scene service
 * @param {object} $aframeEditor The editor service
 */
class EditorCtrl {
	constructor($mdPanel, $mdDialog, $aframeScene, $aframeEditor) {
		'ngInject';
		this.$mdPanel = $mdPanel;
		this.$mdDialog = $mdDialog;
		this.$aframeScene = $aframeScene;
		this.$aframeEditor = $aframeEditor;
		/**
		 * Property to store the state of the current scene with regard to
		 * whether there are unsaved changes.
		 * 
		 * @memberof EditorCtrl
		 * @type {Boolean}
		 */
		this.unpublishedChanges = false;
	}
	/**
	 * Utility method for keeping controller's model of scene data in
	 * sync with `$aframeScene`'s.
	 * @param  {Object} data Scene data to update with
	 */
	updateSceneData(data) {
		Object.assign(this.SceneCtrl, data);
		this.$aframeScene.scene = data;
		console.info('updated scene with data from editor:', data);
	}
	/**
	 * Proxy method for `$aframeEditor.saveDraft()`.
	 * @param  {Boolean} notify Whether to inform user of success.
	 */
	saveDraft(notify = true) {
		this.$aframeEditor.saveDraft(notify);
	}
	/**
	 * Proxy method for `$aframeEditor.loadDraft()`.
	 * @param  {Object}  draft  Chosen draft from draftList
	 * @param  {Boolean} notify Whether to inform user of success.
	 */
	loadDraft(draft, notify = true) {
		this.$aframeEditor.loadDraft(draft._id, notify)
			.then(draftContent => this.updateSceneData(draftContent));
	}
	/**
	 * Calls `$aframeEditor.checkForDraft()` and sets the controller's
	 * `draftList` property to an array of drafts resolved from promise.
	 *
	 * If drafts are found, notifies the user; offers to load the latest draft.
	 * Loads draft if user confirms and updates the scene data accordingly.
	 * 
	 * @param {Boolean} notify Whether to inform the user with toast
	 */
	checkForDraft(notify = true) {
		this.draftList = null;
		this.$aframeEditor.checkForDraft(notify)
			.then(drafts => {
				this.draftList = drafts;
				return drafts.length&&notify&&this.$aframeEditor.draftFound(drafts);
			})
			.then(foundDraftContent => foundDraftContent&&this.updateSceneData(foundDraftContent));
	}
	/**
	 * Confirms with user that they would like to discard the draft
	 * in question; calls `$aframeEditor.discardDraft()` if user confirms.
	 * 
	 * @param {Object}  draft  The draft to discard
	 * @param {Boolean} notify Whether to inform user with toast
	 */
	discardDraft(draft, notify = true) {
		const confirm = this.$mdDialog.confirm()
      .title('Are you sure?')
      .textContent('This action cannot be undone.')
      .ok('Confirm')
      .cancel('Cancel');
    this.$mdDialog.show(confirm).then(() => {
			this.$aframeEditor.discardDraft(draft._id, notify);
    });
	}
	/**
	 * Calls `$aframeEditor.publish()` directly (proxy method); updates
	 * scene data to keep app and server in sync.
	 * 
	 * @param  {Object|Boolean}  newData Data to publish or false
	 * @param  {Boolean}         notify  Whether to inform user with toast
	 */
	publish(newData, notify = true) {
		this.$aframeEditor.publish(newData, notify)
			.then(sceneData => this.updateSceneData(sceneData));
	}
	$onInit() {

		this.SceneCtrl.checkForDraft = () => this.checkForDraft();

		const contextMenu = ev => {
		  ev.stopPropagation();
			if (!this.SceneCtrl._rightClick) {
				this.SceneCtrl._rightClick = ev;
				ev.preventDefault();
				this.SceneCtrl.$sceneEl.on('mouseup', () => {
					this.SceneCtrl._rightClick = false;
					this.SceneCtrl.$sceneEl.off('mouseup')
				});
			}
		};
		this.SceneCtrl.$sceneEl.on('contextmenu', contextMenu);

		this.SceneCtrl._editable = true;
		this.SceneCtrl.openEditor = (ev, item, collection) => {
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
	    const onDomRemoved = () => {
				this.panelRef&&this.panelRef.destroy();
			};

			const locals = { item };
	    locals.publish = () => this.publish();
	    locals.saveDraft = () => this.saveDraft();
			locals.removeThis = () => {
				this.$aframeScene.removeItemFrom(item, collection, () => {
					this.panelRef&&this.panelRef.close();
				});
			}
			locals.closeDialog = () => {
				this.panelRef&&this.panelRef.close();
			}
	    // Build dialog config
			const config = {
				templateUrl: 'aframe/editor/_editor-dialog.html',
				// panelClass: 'demo-menu-example',
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
	addItem(ev, collection) {
		let locals;
		switch(collection) {
			case 'sceneLinks':
				locals = { item: { scene: '', position: [0,0,0], rotation: [0,0,70] } };
				break;
			case 'hotSpots':
				locals = { item: { linked: false, name: '', desc: '', feature: '', position: [0,0,0] } };
				break;
		}

		locals.newItem = true;
    locals.publish = () => this.$mdDialog&&this.$mdDialog.hide('ok');
    locals.saveDraft = () => this.saveDraft();
		locals.removeThis = () => this.$mdDialog&&this.$mdDialog.cancel();
		locals.closeDialog = locals.removeThis;

    this.$mdDialog.show({
      controller: 'EditorDialogCtrl',
			templateUrl: 'aframe/editor/_editor-dialog.html',
      parent: attachTo,
      targetEvent: ev,
		  bindToController: true,
		  controllerAs: '$ctrl',
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true,
			locals
    })
    .then(answer => {
    	if (answer === 'ok') {
				this.$aframeScene.addItemTo( locals.item, this.SceneCtrl[collection], newData => {
					this.$aframeScene.scene[collection] = newData;
				});
    	}
    });
	}
	newScene(ev) {
		let locals = { 
			item: {
				code: '',
				name: '',
				panorama: '',
				parent: ''
			}
		};
		locals.newItem = true;
    locals.publish = () => {
    	this.$mdDialog&&this.$mdDialog.hide('ok');
    }
		locals.removeThis = () => {
			this.$mdDialog&&this.$mdDialog.cancel();
		}
		locals.closeDialog = locals.removeThis;
    locals.saveDraft = () => this.saveDraft(true);
    this.$mdDialog.show({
      controller: 'EditorDialogCtrl',
			templateUrl: 'aframe/editor/_editor-dialog.html',
      parent: attachTo,
      targetEvent: ev,
		  bindToController: true,
		  controllerAs: '$ctrl',
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true,
			locals
    })
    .then(answer => {
    	if (answer === 'ok') {
				this.$aframeEditor.publish(locals.item);
    	}
    });
	}
}

export default {
  name: 'EditorCtrl',
  fn: EditorCtrl
};