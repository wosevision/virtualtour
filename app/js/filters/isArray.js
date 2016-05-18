function isArray() {

  return function(input) {
    return angular.isArray(input);
  };

}

export default {
  name: 'isArray',
  fn: isArray
};