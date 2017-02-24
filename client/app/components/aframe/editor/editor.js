import angular from 'angular';
import ngMaterial from 'angular-material';

import editorComponent from './editor.component';
import editorService from './editor.service';

import editorDialogTemplate from './editorDialog.html';
import editorDialogController from './editorDialog.controller';

let editorModule = angular.module('aframe.editor', [
  ngMaterial
])

.component('sceneEditor', editorComponent)

.service('$aframeEditor', editorService)

.config(($mdPanelProvider) => {
  'ngInject';
	$mdPanelProvider.definePreset('editorDialog', {
		editorDialogTemplate,
		editorDialogController,
    attachTo: angular.element(document.body),
    controllerAs: '$ctrl',
	  bindToController: true,
    panelClass: 'editor-dialog',
		clickOutsideToClose: true,
		escapeToClose: true,
    focusOnOpen: true,
    zIndex: 85
  });
})

.constant('EDITOR_MESSAGES', {
	confirm: {
		textContent: 'Are you sure?',
		action: 'Confirm',
		highlightAction: true,
		highlightClass: 'md-warn',
		position: 'bottom left',
		hideDelay: 0
	},
	itemRemoved: {
		textContent: 'Item removed!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	itemAdded: {
		textContent: 'Item added!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftLoaded: {
		textContent: 'Draft loaded!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	saveDraft: {
		textContent: 'Draft saved!',
		action: 'Publish changes',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	draftFound: {
		textContent: 'Saved drafts found!',
		action: 'Load most recent',
		highlightAction: true,
		highlightClass: 'md-primary',
		position: 'bottom left',
		hideDelay: 5000
	},
	publish: {
		textContent: 'Changes published!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 5000
	},
	discardDraft: {
		textContent: 'Draft discarded!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 1000
	},
	revertToDraft: {
		textContent: 'Reverted to last draft!',
		action: 'Dismiss',
		position: 'bottom left',
		hideDelay: 2000
	}
})

.constant('DATA_MODELS', {
	scene: {
		name: '',
		code: '',
		// state: ''
		parent: '',
		panorama: ''//{}
		// sceneLinks: []
		// hotSpots: []
		// assets: []
		// entities: []
		// script: ''
	},
	sceneLinks: {
		scene: '',
		position: [
			0,
			0,
			0
		],
		rotation: [
			0,
			0,
			70
		]
	},
	hotSpots: {
		linked: false,
		name: '',
		desc: '',
		feature: '',
		position: [
			0,
			0,
			0
		]
	}
})

.name;

export default editorModule;
