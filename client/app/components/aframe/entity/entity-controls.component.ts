import angular from 'angular';

import template from './entity-controls.html';

export const EntityControlsComponent: ng.IComponentOptions = {
  template,
  require: {
    $ngModel: 'ngModel'
  },
  /**
   * This controller hooks into the `ng-model` of an `<aframe-entity ng-model="...">`
   * to provide an interface to its type and attributes for editing. The `<aframe-entity>`
   * requires special attention for editing since its two main editables, type and
   * attributes, have complex handling:
   * - Attributes require two different watches, one for the value and one for the
   *   collection of attributes
   * - Types require completely recompiling the element when they're changed
   */
  controller: class EntityControlsController implements ng.IController {
    $ngModel: ng.INgModelController;

    constructor(
      private $scope: ng.IScope,
    ) {
      'ngInject';
    }

    $onInit() {
      this.$ngModel.$formatters.push(modelValue => {
        let { type, attrs } = modelValue;
        console.info('[entity-controls.component] $onInit.$formatters', { type, attrs });
        return {
          type,
          attrs
        };
      });

      this.$ngModel.$render = () => {
        const { type, attrs } = this.$ngModel.$viewValue;
        console.log('[entity-controls.component] $onInit.$render', { type, attrs });
        this.$scope.type = type;
        this.$scope.attrs = attrs;
      };

      this.$scope.$watch(
        () => { 
          return {
            attrs: this.$scope.attrs, type: this.$scope.type 
          }
        }, newVal => {
          console.info('[entity-controls.component] $onInit.$watch', newVal);
          this.$ngModel.$setViewValue({
            type: this.$scope.type,
            attrs: this.$scope.attrs
          });
        }, true
      );

      this.$ngModel.$parsers.push(viewValue => {
        let { type, attrs } = viewValue;
        console.info('[entity-controls.component] $onInit.$parser', { type, attrs });
        return { type, attrs };
      });
    }

    addAttr() {
      console.info('[entity-controls.component] addAttr');
      return this.$scope.attrs.push({ prop:'', val:'' });
    }

    removeAttr(attribute) {
      const attrIndex = this.$scope.attrs.findIndex(attr => attr.$$hashKey === attribute.$$hashkey);
      console.info('[entity-controls.component] removeAttr', attribute, attrIndex);
      return this.$scope.attrs.splice(attrIndex, 1);
    }
  }
};
