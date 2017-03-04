/**
 * This controller hooks into the `ng-model` of an `<aframe-entity ng-model="...">`
 * to provide an interface to its type and attributes for editing. The `<aframe-entity>`
 * requires special attention for editing since its two main editables, type and
 * attributes, have complex handling:
 * - Attributes require two different watches, one for the value and one for the
 * 	collection of attributes
 * - Types require completely recompiling the element when they're changed
 */
class EntityControlsController {
  ///////
  constructor($scope) {
  	'ngInject';
    this._$scope = $scope;
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
      this._$scope.type = type;
      this._$scope.attrs = attrs;
    };
    ////
    this._$scope.$watch(
      () => { 
        return {
          attrs: this._$scope.attrs, type: this._$scope.type 
        }
      },
      (newVal) => {
        console.log('control $watch', newVal);
        this.$ngModel.$setViewValue({
          type: this._$scope.type,
          attrs: this._$scope.attrs
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
    return this._$scope.attrs.push({prop:'', val:''});
  }
  ////////
  removeAttr(attr) {
    angular.forEach(this._$scope.attrs, (a, i) => {
      if (a.$$hashKey === attr.$$hashKey) {
        console.log('attr removed from control', a);
        return this._$scope.attrs.splice(i, 1);
      };
    });
  }
}

export default EntityControlsController;
