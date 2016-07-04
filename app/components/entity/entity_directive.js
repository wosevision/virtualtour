function entity($compile) {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      entity: '=',
      isAssets: '='
    },
    link: function(scope, element, attrs) {

      var e;
      if (!!scope.isAssets === true) {
        e = scope.entity.type;
      } else {
        e = scope.entity.type === undefined ? 'a-entity' : 'a-' + scope.entity.type;
      }
      
      var a = scope.entity.attrs;
      
      var entity = angular.element(document.createElement(e));
      angular.forEach(a, function(attr) {
        if (attr.val) {
          var val = angular.isArray(attr.val) ? attr.val.join(' ') : attr.val;
          entity.attr(attr.prop, val);
        } else {
          entity.attr(attr.prop, '');
        }
      });
      
      if (angular.isArray(scope.entity.entities)) {
        $compile('<build-entities entities="entity.entities"></build-entities>')(scope, function(cloned, scope){
           entity.append(cloned); 
        });
      }
      element.replaceWith(entity);
    },
    replace: true
  };
}

export default {
  name: 'entity',
  fn: entity
};
