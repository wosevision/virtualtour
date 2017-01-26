class EntityCtrls {
  // $injector annotations
  static get $inject() {
    return ['$scope'];
  }
  ////////
  constructor($scope) {
    this.$scope = $scope;
  }
  ////////
  $onInit() {
    this.$ngModel.$formatters.push(modelValue => {
      let { type, attrs } = modelValue;
      console.info('control $formatter', { type, attrs });
      return {
          type,
          attrs
      };
    });
    ////
    this.$ngModel.$render = () => {
      const { type, attrs } = this.$ngModel.$viewValue;
      console.log('control $render', { type, attrs });
      this.$scope.type = type;
      this.$scope.attrs = attrs;
    };
    ////
    this.$scope.$watch(
      () => { 
        return {
          attrs: this.$scope.attrs, type: this.$scope.type 
        }
      },
      (newVal) => {
        console.log('control $watch', newVal);
        this.$ngModel.$setViewValue({
          type: this.$scope.type,
          attrs: this.$scope.attrs
        });
      }, true
    );
    ////
    this.$ngModel.$parsers.push(viewValue => {
      let { type, attrs } = viewValue;
      console.log('control $parser', { type, attrs });
      return { type, attrs };
    });
  }
  ////////
  addAttr() {
    console.log('attr added from control');
    return this.$scope.attrs.push({prop:'', val:''});
  }
  ////////
  removeAttr(attr) {
    angular.forEach(this.$scope.attrs, (a, i) => {
      if (a.$$hashKey === attr.$$hashKey) {
        console.log('attr removed from control', a);
        return this.$scope.attrs.splice(i, 1);
      };
    });
  }
}

const entityControls = {
  require: {
    $ngModel: 'ngModel'
  },
  controller: EntityCtrls,
  template: `
    <div class="md-title">
      Element:
    </div>
    <md-input-container>
      <label>
        Type:
      </label>
        <input ng-model="type" />
    </md-input-container>
    <div class="md-title">
      Attributes:
    </div>
    <md-list layout="column">
      <md-list-item layout layout-wrap ng-repeat="attr in attrs">
        <span class="md-subheader" flex="100">
          <strong>{{attr.prop}}="<em>{{attr.val}}</em></strong>"
        </span><br/>
        <md-input-container>
          <label>
            Property
          </label>
          <input ng-model="attr.prop" />
        </md-input-container>
        <md-input-container>
          <label>
            Value
          </label>
          <input ng-model="attr.val" />
        </md-input-container>
        <md-button class="md-raised md-warn" ng-click="$ctrl.removeAttr(attr)">Remove</md-button>
      </md-list-item>
      <md-list-item>
        <md-button class="md-raised md-primary" ng-click="$ctrl.addAttr()">Add attribute</md-button>
      </md-list-item>
    </md-list>`
}

export default {
	name: 'entityControls',
	fn: entityControls
}