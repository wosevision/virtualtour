function isString() {

  return function(input) {
    return input = '' ? true : angular.isString(input);
  };

}

export default {
  name: 'isString',
  fn: isString
};