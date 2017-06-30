export const EditorDirective: ng.IDirectiveFactory = ($analytics) => {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	editable: '@'
    },
    require: '^aframeScene',
		link(
      scope: ng.IScope,
      elem: JQuery,
      attrs: ng.IAttributes,
      SceneCtrl: {
        _editable,
        _rightClick,
        editItem(rightClick: boolean, viewItem, modelItem): void
      }
    ) {
			const openEditor = event => {
				// If there's a right click active...
				console.log(scope.$parent)
				if (SceneCtrl._rightClick && SceneCtrl._editable) {
					event.preventDefault();
					// ...open the scene link editor:
					SceneCtrl.editItem(SceneCtrl._rightClick, scope.$parent[scope.editable], SceneCtrl[`${scope.editable}s`]);
					$analytics.eventTrack('click', {
						category: 'edit:scene',
						label: scope.$parent[scope.editable]._id
					});
				}
			};
			elem.on('click', openEditor);
    }
  };
}
