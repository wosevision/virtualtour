function bindHtmlCompile($compile) {
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
}

export default {
  name: 'bindHtmlCompile',
  fn: bindHtmlCompile
};