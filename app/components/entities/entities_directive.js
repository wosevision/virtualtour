function buildEntities() {
  return {
    restrict: 'E',
    scope: {
      entities: '='
    },
    template: '<entity ng-repeat="entity in entities" entity="entity"></entity>',
    replace: true
  };
}

export default {
  name: 'buildEntities',
  fn: buildEntities
};
