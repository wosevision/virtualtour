class EntityController {
  ///////
  constructor($scope) {
  	'ngInject';
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

export default EntityController;
