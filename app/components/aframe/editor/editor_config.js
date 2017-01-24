import { element } from 'angular';

function EditorConfig($mdPanelProvider) {
  'ngInject';

	$mdPanelProvider.definePreset('editorDialog', {
    attachTo: element(document.body),
	  controller: 'EditorDialogCtrl',
    controllerAs: '$ctrl',
	  bindToController: true,
		templateUrl: 'aframe/editor/_editor-dialog.html',
    panelClass: 'editor-dialog',
		clickOutsideToClose: true,
		escapeToClose: true,
    focusOnOpen: true,
    zIndex: 85
  });
}

export default {
  name: 'EditorConfig',
  fn: EditorConfig
};
