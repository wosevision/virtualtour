export const BindCompileDirective = ($compile) => {
	'ngInject';
  return function(scope, element, attrs) {
    const ensureCompileRunsOnce = scope.$watch(
      scope => {
        return scope.$eval(attrs.compile);
      },
      value => {
        element.html(value);
        $compile(element.contents())(scope);
        ensureCompileRunsOnce();
      }
    );
  };
};