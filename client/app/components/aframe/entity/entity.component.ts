import angular from 'angular';

export const EntityComponent = {
  require: {
    $ngModel: 'ngModel',
    SceneCtrl: '^aframeScene'
  },
  /**
   * The `EntityCtrl` acts as an observer of the `ngModel` directive (annotated
   * as `$ngModel` in this controller because it is injected); the entity's
   * model is controlled externally (e.g. by the `EditorCtrl`) though ng-model,
   * so the component has no bindings.
   *
   * The controller's main responsibility is setting up `$watch`es for
   * the relevant model properties and translating them into the
   * appropriaten DOM modifications.
   *
   * An entity's life cycle goes:
   * - Detect change to model
   * - If the model has a `type` property, `$compile()` a new `<a-[type]>`
   * - If the model has an `attrs` property, `parseAttrs()` into a hash object
   * - Apply the attribute hash to the compiled element with `attr()`
   * - Remove element and `$destroy` scope when parent (`ng-repeat`ed) scope is destroyed
   *
   * @todo Clean up `$watch` statements (move handlers into methods)
   * @todo Make better use of `ng-model` parsers/formatters
   * @todo Switch applicable array/object-combo nastiness to proper ES6 maps
   */
  controller: class EntityController implements ng.IController {
      /**
       * Property to hold the `<a-…></a-…>` element after it has been
       * compiled by `compileTemplate()`. Remains false until loaded
       * so attributes are not set before element has initialized.
       */
      entityEl: JQuery;

      $ngModel: ng.INgModelController;
      SceneCtrl;

      constructor(
        private $scope: ng.IScope, 
        private $element: ng.IRootElementService, 
        private $compile: ng.ICompileService
      ) {
        'ngInject';
      }
      /**
       * Sets up `$watch` statements and scope cleanup. The model properties `type`
       * and `attrs` each receive a watch because `type` only needs top-level
       * evaluation, while `attrs` needs deep-watching.
       *
       * TODO: REMOVE DEEP-WATCH FOR PERFORMANCE
       */
      $onInit() {
        this.$scope.$watch(
          () => this.$ngModel.$modelValue.type,
          (type, lastType) => {
            if (type && this.$ngModel.$valid) {
              console.info('entity type $watch', type);
              this.entityEl = this.compileTemplate(type);
              console.log(this.entityEl);
              this.entityEl.attr(this.parseAttrs(this.$ngModel.$modelValue.attrs));
              this.entityEl.on('click', () => {
                // If there's a right click active...
                if (this.SceneCtrl._rightClick && this.SceneCtrl._editable) {
                  // ...open the scene link editor:
                  this.SceneCtrl.editItem(this.SceneCtrl._rightClick, this.$ngModel.$modelValue, this.SceneCtrl.entities);
                }
              });
            }
          });

        this.$scope.$watch(
          () => this.$ngModel.$modelValue.attrs,
          (attrs) => {
            if (this.entityEl && attrs && angular.isArray(attrs) && this.$ngModel.$valid) {
              console.info('entity attrs $watch', attrs);
              this.entityEl.attr(this.parseAttrs(attrs));
            }
          }, true
        );

        this.$scope.$parent.$on('$destroy', () => {
          this.entityEl.remove();
          this.$scope.$destroy();
        });
      }

      /**
       * Compiles a new basic A-Frame element using Angular's `$compile`
       * service; replaces the component's wrapper with the new element.
       * @param  {string} type The element type to compile
       * @return {element}     The compiled element
       */
      compileTemplate(type: string): JQuery {
        const context = Object.assign({}, this.$scope, this);
        return this.$compile(`<a-${type}></a-${type}>`)
        (context, (clone, cloneScope) => {
            this.$element.after(clone);
            this.$element.remove();
            console.info('entity recompiled', clone);
            return clone;
          }
        );
      }
      /**
       * Formats an array of attribute objects into a attribute hash object
       * that can be applied to a jqLite element in a single `attr()` call.
       *
       * Contains validation helpers to check for array and object values,
       * which are mapped to special (A-Frame specific) attribute syntax.
       *
       * @example
       * // An array with objects like...
       * [{
       *   prop: 'scale'
       *   val: 0.8
       * },{
       *   prop: 'position',
       *   val: [ 0, 0, 10 ]
       * },{
       *   prop: 'material',
       *   val: {
       *     color: '#0077CA'
       *   }
       * }]
       * 
       * // ...becomes an object like:
       * {
       *   scale: '0.8',
       *   position: '0 0 10',
       *   material: 'color:#0077CA;'
       * }
       * 
       * @param  {Array} attrs An array of prop/val attrs
       * @return {Object}      An a-frame ready attribute hash
       */
      parseAttrs(attrs) {
        const newAttrs = {};
        for (let { prop, val } of attrs) {
          if ( prop )  {
            // this feels dirty, but seems
            // to maintain integrity of arrays from user input
            val = JSON.parse(JSON.stringify(val));
            // check if the value is an array
            // format into space-separated if so
            if (angular.isArray(val)) {
              val = val.map( (a, i) => {
                return val[i];
              }).join(' ');
            }
            // check if the value is an object
            // format into a css-style prop declaration
            // e.g. width:400px;color:white;etc..
            if (angular.isObject(val)) {
              let condensedProps = [];
              angular.forEach(val, (value, rule) => {
                condensedProps.push([rule, value].join(': '));
              });
              val = condensedProps.join('; ');
            }
            newAttrs[prop] = val;
            console.info(`attr added:%c ${prop} = ${val}`, 'color: blue;')
          }
        }
        return newAttrs;
      }
    }
};
