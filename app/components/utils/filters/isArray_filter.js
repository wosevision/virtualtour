import { isArray } from 'angular';

function isArrayFn() {

  return function(input) {
    return isArray(input);
  };

}

export default {
  name: 'isArray',
  fn: isArrayFn
};