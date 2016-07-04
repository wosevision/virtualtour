function buildScene() {
  return {
    restrict: 'E',
    scope: {
      scene: '='
    },
    template: '<a-scene><a-assets><build-entities entities="scene.assets" is-assets="true"></build-entities></a-assets><build-entities entities="scene.entities"></build-entities></a-scene>',
    replace: true,
    transclude: true//,
    // link: function(scope, element, attr, ctrl, transclude) {
    //   var cloneElement = null;
    //   var cloneScope = null;
    //   scope.$watch('scene',
    //     function handleWatchChange( newValue, oldValue ) {
    //         // If we have an existing item, remove it.
    //         if ( cloneElement ) {
    //             console.log('clone el: ', cloneElement);
    //             cloneScope.$destroy();
    //             cloneScope = null;
    //             cloneElement.remove();
    //             cloneElement = null;
    //         }
    //         //console.log(oldValue);
    //         // If the new value is truthy, inject the element.
    //         if ( newValue ) {
    //             console.log(oldValue);
    //             if (oldValue && oldValue.assets) {
    //               newValue.assets = _.union(oldValue.assets, newValue.assets);
    //             }
    //             console.log(newValue);
    //             cloneScope = scope.$new();
    //             cloneElement = transclude(
    //                 cloneScope,
    //                 function injectClonedElement( clone ) {
    //                   element.append( clone );
    //                 }
    //             );
    //         }
    //     });
    // }


  };
}

export default {
  name: 'buildScene',
  fn: buildScene
};
