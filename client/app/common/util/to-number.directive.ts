export const ToNumberDirective = () => ({
  restrict: 'A',
  require: 'ngModel',
  link(scope, elem, attrs, ngModel) {
    ngModel.$parsers.push(function(value) {
      return '' + value;
    });
    ngModel.$formatters.push(function(value) {
      return parseFloat(value);
    });
  }
});
