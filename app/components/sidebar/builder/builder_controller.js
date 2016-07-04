function builderCtrl($scope, $window) {
	'ngInject';

  const bc = this;
  
  // ADD ATTRIBUTE MENU
  var originatorEv;
  bc.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  bc.menuOptions = [{
    category: 'All',
    props: [{
      name: 'position',
      default: [0, 0, 0]
    },{
      name: 'rotation',
      default: [0, 0, 0]
    },{
      name: 'scale',
      default: [0, 0, 0]
    }]
  },{
    category: 'Geometry',
    props: [{
      name: 'translate',
      default: [0, 0, 0]
    },
      'Box',
    {
      name: 'width',
      default: 1
    }, {
      name: 'height',
      default: 1
    }, {
      name: 'depth',
      default: 1
    },
      'Circle',
    {
      name: 'radius',
      default: 1
    },{
      name: 'segments',
      default: 32
    },{
      name: 'thetaStart',
      default: 0
    },{
      name: 'thetaLength',
      default: 360
    }]
  }];

  bc.update = function(scope, $modelValue, prop, $index) {
    $modelValue.attrs[0].val[$index] = scope.val;
    
    //console.log(newVal.attrs[0].val[$index]);
    // $window.setTimeout(function() {
    //   console.log($index, scope);
    //   //scope.$parent.val = scope.val;
    // }, 0);

  }

	bc.remove = function (scope) {
    scope.remove();
  };

  bc.toggle = function (scope) {
    scope.toggle();
  };

  bc.moveLastToTheBeginning = function () {
    var a = mc.entities.pop();
    mc.entities.splice(0, 0, a);
  };

  bc.newSubItem = function (scope) {
    var nodeData = scope.$modelValue;
    nodeData.nodes.push({
      id: nodeData.id * 10 + nodeData.nodes.length,
      title: nodeData.title + '.' + (nodeData.nodes.length + 1),
      nodes: []
    });
  };

  bc.collapseAll = function () {
    $scope.$broadcast('angular-ui-tree:collapse-all');
  };

  bc.expandAll = function () {
    $scope.$broadcast('angular-ui-tree:expand-all');
  };

}

export default {
  name: 'builderCtrl',
  fn: builderCtrl
};