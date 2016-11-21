function sceneBuilder() {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
    	sceneData: '=?'
    },
    controller: 'BuilderCtrl as bc',
    bindToController: true,
   	templateUrl: 'sidebar/builder/_builder.html'
  };
}

export default {
  name: 'sceneBuilder',
  fn: sceneBuilder
};