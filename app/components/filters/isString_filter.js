import { isString } from 'angular';

function isStringFn() {

  return function(input) {
    return (input === '') ? true : isString(input);
  };

}

export default {
  name: 'isString',
  fn: isStringFn
};