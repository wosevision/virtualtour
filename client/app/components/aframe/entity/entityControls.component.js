import template from './entityControls.html';
import controller from './entityControls.controller';

const entityComponent = {
  template,
  controller,
  require: {
    $ngModel: 'ngModel'
  }
};

export default entityComponent;
