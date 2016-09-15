function bindHtmlCompile($compile) {
	'ngInject';
  return function(scope, element, attrs) {
    var ensureCompileRunsOnce = scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
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